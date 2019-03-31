const API = 'http://18.223.1.218/api';

export async function FETCH_POSTS(dispatch, token, callback) {
  try {
    let posts = await fetch(`${API}/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });
    posts = await posts.json();

    callback && callback();

    posts.msg === 'success' && dispatch({
      type: 'FETCH POSTS',
      payload: posts.data
    });

    posts.msg === 'success' && dispatch({
      type: 'RELOAD NEWSFEED',
    });

    if (posts.msg !== 'success') throw posts;

    return true;
  }
  catch (err) {
    console.log(err);
  }
}

export async function CREATE_POST(dispatch, token, form, callback, onError) {
  try {
    let post = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: form
    });
    post = await post.json();

    if (post.msg === 'success') {
      post.data[0].unix_time = Math.floor(Date.now() / 1000);

      dispatch({
        type: 'ADD NEW POST',
        payload: post.data
      });

      dispatch({
        type: 'CACHE STATE'
      });

      callback && callback();
    }

    else throw post.error;
  }
  catch (err) {
    console.log(err);
    onError && onError();
  }
}

export async function DELETE_POST(dispatch, token, postId, callback, onError) {
  try {
    let post = await fetch(`${API}/posts`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId })
    });
    post = await post.json();

    if (post.msg === 'success') {
      dispatch({
        type: 'DELETE POST',
        payload: postId
      });

      callback && callback();
    }

    else throw post.error;
  }
  catch (err) {
    console.log(err);
    onError && onError();
  }
}

export async function FETCH_COMMENTS(dispatch, token, postId, callback, onError) {
  dispatch({
    type: 'SET FETCHING STATUS FOR COMMENTS'
  });

  dispatch({
    type: 'SET REMOVE TRANSITION'
  });

  try {
    let comments = await fetch(`${API}/posts/get-comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        postId
      })
    });
    comments = await comments.json();

    callback && callback(comments.data);

    comments.msg === 'success' && dispatch({
      type: 'FETCH COMMENTS',
      payload: {
        [postId]: comments.data
      }
    });

    comments.msg === 'success' && dispatch({
      type: 'NULL FETCHING STATUS FOR COMMENTS'
    });

    return true;
  }
  catch (err) {
    console.log(err);
    dispatch({
      type: 'NULL FETCHING STATUS FOR COMMENTS'
    });
    onError && onError(err);
    return err;
  }
}

export async function POST_A_COMMENT(dispatch, token, userId, postId, text, callback, onError) {
  dispatch({
    type: 'SET SENDING STATUS FOR COMMENTS'
  });

  try {
    let comment = await fetch(`${API}/posts/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userId, postId, comment: text
      })
    });
    comment = await comment.json();

    if (comment.msg === 'success') {
      callback && callback(comment.data);

      dispatch({
        type: 'ADD NEW COMMENT',
        payload: {
          postId,
          comment: comment.data
        }
      });
    }

    dispatch({
      type: 'NULL SENDING STATUS FOR COMMENTS'
    });

    dispatch({
      type: 'CACHE STATE'
    });

    return true;
  }
  catch (err) {
    console.log(err);
    onError && onError(err);
    return err;
  }
}

export async function LIKE_A_POST(dispatch, token, userId, postId, callback) {
  dispatch({
    type: 'START CHANGING LIKE STATUS',
    payload: postId
  });

  try {
    let like = await fetch(`${API}/posts/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId, postId
      })
    });
    like = await like.json();

    dispatch({
      type: 'STOP CHANGING LIKE STATUS',
      payload: postId
    });

    if (like.msg === 'success') {
      dispatch({
        type: 'LIKE A POST',
        payload: postId
      });

      dispatch({
        type: 'CACHE STATE',
      });

      callback && callback();
    }

    else throw like;
  }
  catch (err) {
    console.log(err);
  }
}

export async function UNLIKE_A_POST(dispatch, token, userId, postId, callback) {
  dispatch({
    type: 'START CHANGING LIKE STATUS',
    payload: postId
  });

  try {
    let like = await fetch(`${API}/posts/like-remove`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId
      })
    });
    like = await like.json();

    dispatch({
      type: 'STOP CHANGING LIKE STATUS',
      payload: postId
    });

    if (like.msg === 'success') {
      dispatch({
        type: 'UNLIKE A POST',
        payload: postId
      });

      dispatch({
        type: 'CACHE STATE',
      });

      callback && callback();
    }

    else throw like;
  }
  catch (err) {
    console.log(err);
  }
}

export async function REGISTER_USER(dispatch, body, callback, onError) {
  try {
    let user = await fetch(`${API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    user = await user.json();

    user.msg === 'success' && dispatch({
      type: 'LOG USER IN',
      payload: {
        token: user.data.token,
        user: user.data.user
      }
    });

    user.msg === 'success' && callback && callback();

    if (user.msg === 'failed, wrong parameters') throw user;

    return true;
  }
  catch (err) {
    console.log(err);
    onError && onError(err);
    return false;
  }
}

export async function LOG_USER_IN(dispatch, email, password, callback, onError) {
  try {
    let user = await fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });
    user = await user.json();

    await user.msg === 'success' && dispatch({
      type: 'LOG USER IN',
      payload: {
        token: user.data.token,
        user: user.data.user
      }
    });

    user.msg === 'success' && callback && callback();
    if (user.msg === 'Unauthorised') throw user;

    return true;
  }
  catch (err) {
    const caption = 'Credentials are Invalid!';
    onError && onError(caption);
    return false;
  }
}

export async function EDIT_PROFILE(dispatch, token, formData, callback, onError) {
  try {
    let profile = await fetch(`${API}/user`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    profile = await profile.json();

    if (profile.msg === 'success') {
      const user = await GET_USER(token);

      dispatch({
        type: 'EDIT USER PROFILE',
        payload: { user, token }
      });

      dispatch({
        type: 'CACHE STATE'
      });

      callback && callback();
    }

    if (profile.error) throw profile.error;
  }
  catch (err) {
    console.log(err);
    onError && onError();
  }
}

export async function SEARCH(dispatch, token, text, callback, onError) {
  try {
    let search = await fetch(`${API}/search/${text}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    search = await search.json();

    if (search.msg === 'success') {
      dispatch({
        type: 'STORE SEARCH RESULT',
        payload: {
          [text]: search.data[0]
        }
      })

      callback && callback(search.data[0]);
    }

    else throw search;
  }
  catch (err) {
    console.log(err);
    onError && onError();
  }
}

export async function GET_USER(token, id, callback, onError) {
  const url = id ? `${API}/user/${id}` : `${API}/user`;

  try {
    let user = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'GET'
    });
    user = await user.json();

    if (user.msg !== 'success') throw user;
    
    else {
      callback && callback(user.data);
      return user.data;
    }
  }
  catch (err) {
    console.log(err);
    onError && onError();
  }
}
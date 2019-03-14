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

    if (posts.msg !== 'success') throw posts;

    return true;
  }
  catch (err) {
    console.log(err);
  }
}

export async function CREATE_POST(dispatch, token, formData, callback, onError) {
  try {
    let post = await fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    post = await post.json();

    post.msg === 'success' && dispatch({
      type: 'ADD NEW POST',
      payload: {
        post: post.data
      }
    });

    post.msg === 'success' && callback && callback();
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
  // const comment = {
  //   userSrc: 'assets/img/users/1.jpg',
  //   postId: 2,
  //   commentId: 1,
  //   userId,
  //   username: 'koryoesz',
  //   brandName: 'dominerf - house',
  //   name: 'Yomi Kolawole',
  //   comment: text,
  //   time: '1 second ago'
  // }

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

    callback && callback();

    if (like.msg === 'success') {
      dispatch({
        type: 'STOP CHANGING LIKE STATUS',
        payload: postId
      });

      dispatch({
        type: 'LIKE A POST',
        payload: postId
      });
    }

    else if (like.msg === 'liked before') {
      dispatch({
        type: 'STOP CHANGING LIKE STATUS',
        payload: postId
      });
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

    callback && callback();

    like && dispatch({
      type: 'STOP CHANGING LIKE STATUS',
      payload: postId
    });

    like.msg === 'success' && dispatch({
      type: 'UNLIKE A POST',
      payload: postId
    });

    if (like.msg !== 'success') throw like;
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
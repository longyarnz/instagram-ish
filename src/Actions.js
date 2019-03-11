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
  }
  catch (err) {
    console.log(err);
  }
}

export async function FETCH_COMMENTS(dispatch, token, postId, callback, preFetch) {
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

    callback && callback();

    comments.msg === 'success' && dispatch({
      type: 'FETCH COMMENTS',
      payload: {
        [ postId ]: comments.data
      }
    });

    setTimeout(() => dispatch({
      type: 'FETCH COMMENTS',
      payload: {
        [postId]: comments.data
      }
    }), 1000);

    comments.msg === 'success' && dispatch({
      type: 'NULL FETCHING STATUS FOR COMMENTS'
    });

    dispatch({
      type: 'NULL FETCHING STATUS FOR COMMENTS'
    });
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

export async function CREATE_POST(dispatch, token, email, password, callback, onError) {
  try {
    let user = await fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email, password
      })
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
  }
  catch (err) {
    console.log(err);
    onError && onError();
  }
}
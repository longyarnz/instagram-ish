export async function FETCH_POSTS(dispatch, callback){
  let posts = await fetch('http://18.223.1.218/api/posts');
  posts = await posts.json();

  posts.message === 'success' && dispatch({
    type: 'FETCH POSTS',
    payload: posts.data
  });

  callback && callback();
  
  return posts.message === 'success' ? true : posts.data;
}

export async function FETCH_COMMENTS(dispatch, postId, callback){
  let comments = await fetch('http://18.223.1.218/api/get-comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      postId
    })
  });
  comments = await comments.json();

  comments.message === 'success' && dispatch({
    type: 'FETCH COMMENTS',
    payload: {
      postId: comments.data
    }
  });

  callback && callback();

  return comments.message === 'success' ? true : comments.data;
}

export async function REGISTER_USER(dispatch, body, callback){
  let user = await fetch('http://18.223.1.218/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body
    })
  });
  user = await user.json();

  user.message === 'success' && dispatch({
    type: 'LOG USER IN',
    payload: {
      token: user.data.token,
      user: user.data.user
    }
  });

  callback && callback();

  return user.message === 'success' ? true : user.data;
}

export async function LOG_USER_IN(dispatch, email, password, callback){
  let user = await fetch('http://18.223.1.218/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  });
  user = await user.json();

  callback && callback();

  user.message === 'success' && dispatch({
    type: 'LOG USER IN',
    payload: {
      token: user.data.token,
      user: user.data.user
    }
  });

  return user.message === 'success' ? true : user.data;
}

export async function CREATE_POST(dispatch, email, password, callback){
  let user = await fetch('http://18.223.1.218/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  });
  user = await user.json();

  callback && callback();

  user.message === 'success' && dispatch({
    type: 'LOG USER IN',
    payload: {
      token: user.data.token,
      user: user.data.user
    }
  });

  return user.message === 'success' ? true : user.data;
}
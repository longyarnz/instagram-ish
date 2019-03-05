export async function FETCH_POSTS(dispatch, callback){
  let posts = await fetch('http://18.223.1.218/api/posts');
  posts = await posts.json();

  posts.msg === 'success' && dispatch({
    type: 'FETCH POSTS',
    payload: posts.data
  });

  callback && callback();
  
  return posts.msg === 'success' ? true : posts.data;
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

  comments.msg === 'success' && dispatch({
    type: 'FETCH COMMENTS',
    payload: {
      postId: comments.data
    }
  });

  callback && callback();

  return comments.msg === 'success' ? true : comments.data;
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

  user.msg === 'success' && dispatch({
    type: 'LOG USER IN',
    payload: {
      token: user.data.token,
      user: user.data.user
    }
  });

  callback && callback();

  return user.msg === 'success' ? true : user.data;
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
  
  user.msg === 'success' && dispatch({
    type: 'LOG USER IN',
    payload: {
      token: user.data.token,
      user: user.data.user
    }
  });

  callback && callback();

  return user.msg === 'success' ? true : user.data;
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
  
  user.msg === 'success' && dispatch({
    type: 'LOG USER IN',
    payload: {
      token: user.data.token,
      user: user.data.user
    }
  });
  
  callback && callback();

  return user.msg === 'success' ? true : user.data;
}

// {"body":{"first_name":"Michael","last_name":"Rumble","email":"lekan@gmail.com","username":"Miru","phone":"08082935102","sex":"male","password":"12345","c_password":"12345","user_type_id":2}}
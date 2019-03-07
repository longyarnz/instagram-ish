export async function FETCH_POSTS(dispatch, token, callback) {
  try {
    let posts = await fetch('http://18.223.1.218/api/posts', {
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
  }
  catch (err) {
    console.log(err);
  }
}

export async function FETCH_COMMENTS(dispatch, token, postId, callback) {
  try {
    let comments = await fetch('http://18.223.1.218/api/get-comments', {
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
        postId: comments.data
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}

export async function REGISTER_USER(dispatch, body, callback) {
  try {
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

    callback && callback();

    user.msg === 'success' && dispatch({
      type: 'LOG USER IN',
      payload: {
        token: user.data.token,
        user: user.data.user
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}

export async function LOG_USER_IN(dispatch, email, password, callback) {
  try {
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

    user.msg === 'success' && dispatch({
      type: 'LOG USER IN',
      payload: {
        token: user.data.token,
        user: user.data.user
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}

export async function CREATE_POST(dispatch, token, email, password, callback) {
  try {
    let user = await fetch('http://18.223.1.218/api/login', {
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

    callback && callback();

    user.msg === 'success' && dispatch({
      type: 'LOG USER IN',
      payload: {
        token: user.data.token,
        user: user.data.user
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}

// {"body":{"first_name":"Michael","last_name":"Rumble","email":"lekan@gmail.com","username":"Miru","phone":"08082935102","sex":"male","password":"12345","c_password":"12345","user_type_id":2}}
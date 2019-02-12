/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

function submitLoginForm(e, dispatch, goTo){
  e.preventDefault();
  const [ email, password ] = e.target;
  dispatch({
    type: 'LOG USER IN', 
    payload: { 
      email: email.value,
      username: 'Server Data',
      password: password.value
    }
  });
  goTo('./pages/NewsFeed');
}

export default function Login(props) {
  const onSubmit = e => submitLoginForm(e, props.dispatch, props.goTo);

  return (
    <section className="login">
      <div className="container">
        <div className="banner-content">
          <h1>
          <img src="assets/img/favicon.png" alt="Dominerf Logo" style={{ width: '30%'}} />
          </h1>
          <form method="post" className="form-signin" onSubmit={onSubmit}>
            <h3 className="form-signin-heading">SIGN IN</h3>
            <div className="form-group">
              <input name="email" type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" placeholder="Password" />
            </div>
            <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">Sign in</button>
            <br />
            <a className="btn btn-dark " href="#" role="button" onClick={() => props.goTo('./pages/Register')}>
              Don't have an account yet? Register Here.
            </a>
            <a className="btn btn-dark " href="#" role="button" onClick={() => props.goTo('./pages/Register')}>
              Forgot your password?
            </a>
          </form>
        </div>
      </div>
    </section>
  )
}
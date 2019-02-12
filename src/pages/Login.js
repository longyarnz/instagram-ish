/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
export default function Login(props) {
  return (
    <section className="login">
      <div className="container">
        <div className="banner-content">
          <h1>
            <i className="fa fa-smile"></i> Fluffs
          </h1>
          <form method="post" className="form-signin">
            <h3 className="form-signin-heading">Please sign in</h3>
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
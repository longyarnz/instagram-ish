/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Icon from '../components/Icon';

function submitRegisterForm(e, dispatch, goTo) {
  e.preventDefault();
  const [email, username, password] = e.target;
  dispatch({
    type: 'REGISTER USER',
    payload: {
      email: email.value,
      username: username.value,
      password: password.value
    }
  });
  goTo('./pages/NewsFeed');
}

export default function Register(props) {
  const onSubmit = e => submitRegisterForm(e, props.dispatch, props.goTo);

  return (
    <section className="register">
      <div className="container">
        <div className="banner-content">
          <button onClick={() => props.goTo('./pages/NewsFeed')}>
            <Icon name="home" />
            {/* <span>HOME</span> */}
          </button>
          <img src="assets/img/favicon.png" alt="Dominerf Logo" />
          <form method="post" className="form-signin" onSubmit={onSubmit}>
            <h3 className="form-signin-heading">Nice to Meet Ya!</h3>
            <div className="form-group">
              <input name="first" type="text" className="form-control" placeholder="First Name" autoComplete="true" />
            </div>
            <div className="form-group">
              <input name="last" type="text" className="form-control" placeholder="Last Name" autoComplete="true" />
            </div>
            <div className="form-group">
              <input name="email" type="email" className="form-control" placeholder="Email" autoComplete="true" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" placeholder="Password" autoComplete="true" />
            </div>
            <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">SIGN UP</button>
            <br />
            <span className="btn btn-dark " role="button" onClick={() => props.goTo('./pages/Login')}>
              Already have an account?
              <button>
                LOG IN
              </button>
            </span>
          </form>

        </div>
      </div>
    </section>
  )
}
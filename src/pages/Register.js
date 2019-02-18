/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Icon from '../components/Icon';

function submitRegisterForm(e, dispatch, goTo) {
  e.preventDefault();
  const [email, username, password] = e.target;
  dispatch({
    type: 'LOG USER IN',
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
      <button onClick={() => props.goTo('./pages/NewsFeed')}>
        <Icon name="home" />
      </button>
      <img src="assets/img/favicon.png" alt="Dominerf Logo" />

      <form method="post" onSubmit={onSubmit}>
        <h3>Nice to Meet Ya!</h3>
        <input name="first" type="text" placeholder="First Name" autoComplete="true" />
        <input name="last" type="text" placeholder="Last Name" autoComplete="true" />
        <input name="email" type="email" placeholder="Email" autoComplete="true" />
        <input type="password" name="password" placeholder="Password" autoComplete="true" />
        <input type="password" name="password" placeholder="Confirm Password" />
        <input list="sexes" name="sex" placeholder="Sex" />
        <datalist id="sexes">
          <option value="Male" />
          <option value="Female" />
        </datalist>
        <input list="accounts" name="accountType" placeholder="Account Type" />
        <datalist id="accounts">
          <option value="Fashion Designer" />
          <option value="Fashion Enthusiast" />
        </datalist>
        <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">SIGN UP</button>
        <br />
        <span className="btn btn-dark " role="button" onClick={() => props.goTo('./pages/Login')}>
          Already have an account?
          <button>LOG IN</button>
        </span>
      </form>
    </section>
  )
}
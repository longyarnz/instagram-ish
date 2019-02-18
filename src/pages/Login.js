import React from 'react';
import Icon from '../components/Icon';

function submitLoginForm(e, dispatch, goTo) {
  e.preventDefault();
  const [email] = e.target;

  dispatch({
    type: 'LOG USER IN',
    payload: {
      email: email.value,
      username: 'LekanMedia',
      accountType: 'Customer'
    }
  });

  goTo('./pages/NewsFeed');
}

export default function Login(props) {
  const onSubmit = e => submitLoginForm(e, props.dispatch, props.goTo);

  return (
    <section className="register">
      <button onClick={() => props.goTo('./pages/NewsFeed')}>
        <Icon name="home" />
      </button>
      <img src="assets/img/favicon.png" alt="Dominerf Logo" />
      <form method="post" onSubmit={onSubmit}>
        <h3>We've Missed You!</h3>
        <input name="email" type="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">LOG IN</button>

        <span className="btn btn-dark " role="button" onClick={() => props.goTo('./pages/Register')}>
          Don't have an account?
          <button>REGISTER</button>
        </span>

        <span className="btn btn-dark " role="button" onClick={() => props.goTo('./pages/Register')}>
          <button>FORGOT YOUR PASSWORD?</button>
        </span>
      </form>
    </section>
  )
}
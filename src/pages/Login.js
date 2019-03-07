import React, { useState } from 'react';
import Icon from '../components/Icon';
import { LOG_USER_IN } from '../Actions';
import Spinner from '../components/Spinner';

async function submitLoginForm(e, dispatch, callback) {
  e.preventDefault();
  const [ email, password ] = e.target;
  await LOG_USER_IN(dispatch, email.value, password.value, callback);
  dispatch({ type: 'CACHE STATE'});
}

export default function Login(props) {
  const [ isLoading, setIsLoading ] = useState(false);

  const onSubmit = e => {
    setIsLoading(true);

    const callback = () => {
      setIsLoading(false);
      props.goTo('./pages/NewsFeed');
    }

    submitLoginForm(e, props.dispatch, callback);
  }

  const button = isLoading ? <Spinner style={{animationDuration: '.55s'}} /> : 'LOG IN';

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
        <button type="submit">{ button }</button>

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
import React from 'react';
import Icon from '../components/Icon';

function submitLoginForm(e, dispatch, goTo) {
  e.preventDefault();
  const [ email ] = e.target;

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
    <section className="login register">
      <div className="container">
        <div className="banner-content">
          <button onClick={() => props.goTo('./pages/NewsFeed')}>
            <Icon name="home" />
            {/* <span>HOME</span> */}
          </button>
          <img src="assets/img/favicon.png" alt="Dominerf Logo" style={{ width: '30%' }} />
          <form method="post" className="form-signin" onSubmit={onSubmit}>
            <h3 className="form-signin-heading">We've Missed You!</h3>
            <div className="form-group">
              <input name="email" type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" placeholder="Password" />
            </div>
            <button className="kafe-btn kafe-btn-mint btn-block" type="submit" name="subm">LOG IN</button>
            <br />
            <span className="btn btn-dark " role="button" onClick={() => props.goTo('./pages/Register')}>
              Don't have an account?
              <button>
                REGISTER
              </button>
            </span>
            <span className="btn btn-dark " role="button" onClick={() => props.goTo('./pages/Register')}>
              <button>
                FORGOT YOUR PASSWORD?
              </button>
            </span>
          </form>
        </div>
      </div>
    </section>
  )
}
import React, { useState, useRef } from 'react';
import Icon from '../components/Icon';
import { REGISTER_USER } from '../Actions';
import Spinner from '../components/Spinner';

async function submitRegisterForm(e, dispatch, callback) {
  e.preventDefault();
  const [first, last, username, phone, email, password, ,sex, accountType] = e.target;
  const body = {
    first_name: first.value,
    last_name: last.value,
    email: email.value,
    username: username.value,
    phone: phone.value,
    sex: sex.value,
    password: password.value,
    c_password: password.value,
    user_type_id: accountType.value === 'Fashion Enthusiast' ? 1 : 2
  }
  const success = await REGISTER_USER(dispatch, body, callback);
  console.log(success);
}

export default function Register(props) {
  const [ isLoading, setIsLoading ] = useState(false);

  const password = useRef(null);

  const onChange = e => {
    const confirm = e.target;
    const check = confirm.value !== password.current.value ? 'Passwords do not match!' : '';
    confirm.setCustomValidity(check);
  }

  const onSubmit = e => {
    setIsLoading(true);

    const callback = () => {
      setIsLoading(false);
      props.goTo('./pages/NewsFeed');
    }

    submitRegisterForm(e, props.dispatch, callback);
  }

  const button = isLoading ? <Spinner style={{animationDuration: '.55s'}} /> : 'SIGN UP';

  return (
    <section className="register">
      <button onClick={() => props.goTo('./pages/NewsFeed')}>
        <Icon name="home" />
      </button>
      <img src="assets/img/favicon.png" alt="Dominerf Logo" />

      <form method="post" onSubmit={onSubmit}>
        <h3>Nice to Meet Ya!</h3>
        <input name="first" type="text" placeholder="First Name" autoComplete="true" required />
        <input name="last" type="text" placeholder="Last Name" autoComplete="true" required />
        <input name="username" type="text" placeholder="Username" autoComplete="true" required />
        <input name="phone" type="number" placeholder="Phone" autoComplete="true" required />
        <input name="email" type="email" placeholder="Email" autoComplete="true" required />
        <input type="password" name="password" placeholder="Password" autoComplete="true" ref={password} required />
        <input type="password" name="password" placeholder="Confirm Password" onChange={onChange} required />
        <select name="sex">
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <select name="accountType">
          <option value="Fashion Designer">Fashion Designer</option>
          <option value="Fashion Enthusiast">Fashion Enthusiast</option>
        </select>
        <button className="btn-block" type="submit" name="subm">{ button }</button>
        <span className="btn btn-dark" role="button" onClick={() => props.goTo('./pages/Login')}>
          Already have an account?
          <button>LOG IN</button>
        </span>
      </form>
    </section>
  )
}
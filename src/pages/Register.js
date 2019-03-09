import React, { useState, useRef } from 'react';
import Icon from '../components/Icon';
import { REGISTER_USER } from '../Actions';
import Spinner from '../components/Spinner';
import ShouldRender from '../components/ShouldRender';

async function submitRegisterForm(e, dispatch, callback, onError) {
  const [first, last, username, email, password, c_password, accountType, brand] = e.target;

  // const body = {
  //   "first_name": "Michael",
  //   "last_name": "Smith",
  //   "email": "m.smith@gmail.com",
  //   "username": "Smithman",
  //   "password": "123",
  //   "c_password": "123",
  //   "user_type_id": "2",
  //   "brand_name": "Smithsonian" 
  // }
  const body = {
    first_name: first.value,
    last_name: last.value,
    email: email.value,
    username: username.value,
    password: password.value,
    c_password: c_password.value,
    user_type_id: accountType.value === 'Fashion Enthusiast' ? '1' : '2',
    brand_name: brand && brand.value && accountType.value === 'Fashion Designer' ? brand.value : null
  }
  const success = await REGISTER_USER(dispatch, body, callback, onError);
  console.log(success);
}

export default function Register(props) {
  const [caption, setCaption] = useState('Nice to Meet Ya!');
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(undefined);
  const [match, setMatch] = useState(false);

  const password = useRef(null);
  const c_password = useRef(null);

  const onChange = e => {
    const check = c_password.current.value !== password.current.value ? 'Passwords do not match!' : '';
    c_password.current.setCustomValidity(check);
    setMatch(check === '');
  }

  const onChangeSelect = e => {
    const select = e.target;
    const check = select.value === undefined ? 'Select an account type' : '';
    select.setCustomValidity(check);
    setAccount(select.value);
  }

  const onSubmit = e => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    else if (account === undefined) {
      e.target[6].setCustomValidity('Select an account type');
      return;
    }

    else if (!match) {
      e.target[5].setCustomValidity('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const onError = (err) => {
      console.log(err);
      setIsLoading(false);
      setCaption(err);
    }

    console.log(account);
    const callback = () => {
      props.goTo('./pages/NewsFeed');
    }

    submitRegisterForm(e, props.dispatch, callback, onError);
  }

  const button = isLoading ? <Spinner style={{ animationDuration: '.55s' }} /> : 'SIGN UP';

  return (
    <section className="register">
      <button onClick={() => props.goTo('./pages/NewsFeed')}>
        <Icon name="home" />
      </button>
      <img src="assets/img/favicon.png" alt="Dominerf Logo" />

      <form method="post" onSubmit={onSubmit}>
        <h3>{caption}</h3>
        <input
          name="first"
          type="text"
          placeholder="First Name"
          autoComplete="true"
          required
        />
        <input
          name="last"
          type="text"
          placeholder="Last Name"
          autoComplete="true"
          required
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="true"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="true"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="true"
          ref={password}
          required
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={onChange}
          ref={c_password}
          required
        />
        <select name="accountType" onChange={onChangeSelect} required>
          <option value={undefined}>Account Type</option>
          <option value="Fashion Enthusiast">Fashion Enthusiast</option>
          <option value="Fashion Designer">Fashion Designer</option>
        </select>

        <ShouldRender if={account === 'Fashion Designer'}>
          <input
            name="brand_name"
            type="text"
            placeholder="Brand Name"
            autoComplete="true"
            required
          />
        </ShouldRender>

        <button disabled={isLoading} className="btn-block" type="submit">
          {button}
        </button>

        <span className="btn btn-dark" role="button" onClick={() => props.goTo('./pages/Login')}>
          Already have an account?
          <button>LOG IN</button>
        </span>
      </form>
    </section>
  )
}
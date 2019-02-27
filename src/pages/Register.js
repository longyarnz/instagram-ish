import React from 'react';
import Icon from '../components/Icon';
// import ShouldRender from '../components/ShouldRender';

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
  // const [isDesigner, setIsDesigner] = useState('Fashion Designer');

  const onChange = e => {
    console.log(e.target.value);
    // setIsDesigner(e.target.value);
  }
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
        <input name="username" type="text" placeholder="Username" autoComplete="true" />
        {/* <input name="phone" type="number" placeholder="Phone" autoComplete="true" /> */}
        <input name="email" type="email" placeholder="Email" autoComplete="true" />
        <input type="password" name="password" placeholder="Password" autoComplete="true" />
        <input type="password" name="password" placeholder="Confirm Password" />
        <input list="sexes" name="sex" placeholder="Sex" />
        <datalist id="sexes">
          <option value="Male" />
          <option value="Female" />
          <select name="sex">
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </datalist>
        <input list="accounts" name="accountType" placeholder="Fashion Designer / Enthusiast" onChange={onChange} />
        <datalist id="accounts">
          <option value="Fashion Designer" />
          <option value="Fashion Enthusiast" />
          <select name="accountType" onChange={onChange}>
            <option value="Fashion Designer">Fashion Designer</option>
            <option value="Fashion Enthusiast">Fashion Enthusiast</option>
          </select>
        </datalist>
        {/* <ShouldRender if={isDesigner === 'Fashion Designer'}>
          <input name="experience" type="number" placeholder="Experience" autoComplete="true" />
        </ShouldRender> */}
        <button className="btn-block" type="submit" name="subm">SIGN UP</button>
        <br />
        <span className="btn btn-dark" role="button" onClick={() => props.goTo('./pages/Login')}>
          Already have an account?
          <button>LOG IN</button>
        </span>
      </form>
    </section>
  )
}
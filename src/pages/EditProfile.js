import React, { useRef, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { ColorIcon } from '../components/Icon';
import EditProfileImage from '../components/EditProfileImage';
import ShouldRender from '../components/ShouldRender';
import { EDIT_PROFILE } from '../Actions';
import Spinner from '../components/Spinner';
import useScroll from '../components/useScroll';

export default function EditProfile(props) {
  const form = useRef(null);
  const button = useRef(null);
  const inputs = useRef(null);
  const _this = useRef(null);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);
  const [src, setSrc] = useState(null);
  const { goTo, state, dispatch } = props;
  const userIsADesigner = state.upgradeAccount || state.user.accountType === 'Fashion Designer';

  useScroll(props);

  useEffect(() => {
    for (let i = 0; i < inputs.current.children.length; i++) {
      const input = inputs.current.children[i];
      if (['INPUT'].some(i => i === input.tagName)) {
        input.autocomplete = "on";
        input.spellcheck = "true";
        input.id = ++i / 2;
        input.required = true;
      }
      else {
        input.htmlFor = (i + 2) / 2;
      }
    }
  }, []);

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  useEffect(() => {
    if (!state.user.sex) {
      form.current.elements.sex.setCustomValidity('Select an account type');
    }
    else {
      form.current.elements.sex.setCustomValidity('');
    }
  }, [state.user.sex]);

  const onSubmit = e => {
    e.preventDefault();
    const { target: form, target: { elements } } = e;

    if (isPosting) return;

    if (elements.sex.value === 'Select Sex') {
      elements.sex.setCustomValidity('Select an account type');
      return;
    }

    else {
      elements.sex.setCustomValidity('');
    }

    setIsPosting(true);
    setError(null);

    const newProfile = { user: {} }, inputs = [
      'address', 'brand_name', 'sex',
      'first_name', 'last_name', 'phone',
      'username', 'photo_path'
    ];

    inputs.forEach(i => {
      if (!userIsADesigner && ['brand_name'].includes(i)) {
        return;
      }

      newProfile.user[i] = i === 'photo_path' ? src : elements[i].value;
    });

    newProfile.user.photo = src;
    newProfile.user.email = state.user.email;
    newProfile.user.userType = userIsADesigner ? 'designer' : 'user';
    newProfile.token = state.token;

    const callback = () => {
      goTo('./pages/Profile');
    }

    const onError = () => {
      if (_this.current === 'UNMOUNTED') return;

      setIsPosting(false);
      setError('Network Error: Unable To Update Profile');
      setTimeout(() => {
        _this.current === 'MOUNTED' && setError(null);
      }, 5000);
    }

    const profile = new FormData(form);
    const userType = userIsADesigner ? 2 : 1;
    profile.append('user_type_id', userType);
    profile.append('email', state.user.email);
    newProfile.user.user_type_id = userType;

    const photo = profile.get('photo_path');
    if(photo.size !== 0) {
      profile.append('image', photo);
      profile.delete('photo_path');
    }

    EDIT_PROFILE(dispatch, state.token, profile, callback, onError);
  }

  const goBack = () => goTo('./pages/Profile');

  const saveProfile = () => button.current.click();

  const SaveIcon = () => (
    isPosting ?
      <Spinner style={{ animationDuration: '.55s' }} /> :
      <ColorIcon
        name="check"
        color="#fff"
        style={{
          backgroundColor: "#5cb85c",
          borderRadius: '3px'
        }}
        onClick={saveProfile}
      />
  );

  const onSelectImage = image => {
    const src = URL.createObjectURL(image);
    setSrc(src);
  }

  const onChangeSex = e => {
    if (['male', 'female'].includes(e.target.value)) {
      e.target.setCustomValidity('');
    }
  }

  const navbarTitle = !error ? 'EDIT PROFILE' : error;
  const errorStyle = error ? { color: '#d9534f' } : null;
  const origin = window.location.origin === 'http://localhost:3000' ?
    'http://18.223.1.218' : '';

  return (
    <section className="edit-profile">
      <nav className="edit-profile">
        <div>
          <ColorIcon name="close" color="#f00" onClick={goBack} />
          <span style={errorStyle}>{navbarTitle}</span>
        </div>
        <SaveIcon />
      </nav>

      <form ref={form} onSubmit={onSubmit} encType="multipart/form-data">
        <label htmlFor="0">Change Profile Image</label>
        <EditProfileImage
          name="photo_path"
          prevImg={`${origin}/${state.user.photo}` || 'assets/img/user.png'}
          onSelect={onSelectImage}
        />

        <div className="input-group" ref={inputs}>
          <label>First Name</label>
          <input placeholder="First Name" name="first_name" type="text" defaultValue={state.user.firstName} />

          <label>Last Name</label>
          <input placeholder="Last Name" name="last_name" type="text" defaultValue={state.user.lastName} />

          <label>Username</label>
          <input placeholder="Username" name="username" type="text" defaultValue={state.user.username} />

          <ShouldRender if={false}>
            <label>Email</label>
            <input placeholder="Email" name="email" type="email" defaultValue={state.user.email} />
          </ShouldRender>

          <label>Phone</label>
          <input placeholder="Phone Number" name="phone" type="number" defaultValue={Number(state.user.phone)} />

          <label>Address</label>
          <input placeholder="Busines Address" name="address" type="text" defaultValue={state.user.address} />

          <label>Sex</label>
          <select name="sex" required={true} onChange={onChangeSex} defaultValue={state.user.sex}>
            <option value={undefined}>Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <ShouldRender if={userIsADesigner}>
            <label>Brand</label>
            <input placeholder="Brand Name" name="brand_name" type="text" defaultValue={state.user.brand} />
          </ShouldRender>
        </div>
        <button ref={button} type="submit"></button>
      </form>
      <Footer />
    </section>
  )
}

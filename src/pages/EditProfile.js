import React, { useRef, useEffect } from 'react';
import Footer from '../components/Footer';
import { ColorIcon } from '../components/Icon';
import EditProfileImage from '../components/EditProfileImage';

export default function EditProfile(props) {
  const form = useRef(null);
  const inputs = useRef(null);

  useEffect(() => {
    for (let i = 0; i < inputs.current.children.length; i++) {
      const input = inputs.current.children[i];
      if(['INPUT', 'TEXTAREA'].some(i => i === input.tagName)){
        input.autocomplete = "on";
        input.spellcheck = "true";
        input.id = ++i / 2;
      }
    }
  });
  
  const { goTo, state } = props;

  const saveProfile = () => {
    console.log([form.current]);
  }

  const goBack = () => goTo('./pages/Profile');

  return (
    <section className="edit-profile">
      <nav className="edit-profile">
        <ColorIcon name="close" color="#f00" onClick={goBack} />
        <span>EDIT PROFILE</span>
        <ColorIcon name="check" color="green" onClick={saveProfile} />
      </nav>

      <form ref={form}>
        <EditProfileImage />
        <div className="input-group" ref={inputs}>
          <label htmlFor="1">First Name</label>
          <input placeholder="First Name" name="firstName" type="text" defaultValue={state.user.firstName} />

          <label htmlFor="2">Last Name</label>
          <input placeholder="Last Name" name="lastName" type="text" defaultValue={state.user.lastName} />

          <label htmlFor="3">Username</label>
          <input placeholder="Username" name="username" type="text" defaultValue={state.user.username} />

          <label htmlFor="4">Email</label>
          <input placeholder="Email" name="email" type="email" defaultValue={state.user.email} />

          <label htmlFor="5">Phone</label>
          <input placeholder="Phone Number" name="phone" type="phone" defaultValue={state.user.phone} />

          <label htmlFor="6">About</label>
          <textarea placeholder="Description" name="description" rows={8} defaultValue={state.user.about}>
          </textarea>
        </div>
      </form>
      <Footer />
    </section>
  )
}

import React, { useRef, useEffect } from 'react';
import Footer from '../components/Footer';
import { ColorIcon } from '../components/Icon';
import EditProfileImage from '../components/EditProfileImage';
import ShouldRender from '../components/ShouldRender';

export default function EditProfile(props) {
  const form = useRef(null);
  const inputs = useRef(null);

  useEffect(() => {
    for (let i = 0; i < inputs.current.children.length; i++) {
      const input = inputs.current.children[i];
      if (['INPUT', 'TEXTAREA'].some(i => i === input.tagName)) {
        input.autocomplete = "on";
        input.spellcheck = "true";
        input.id = ++i / 2;
      }
      else{
        console.log(input);
        input.htmlFor = (i + 2) / 2;
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
        <label htmlFor="0">Change Profile Image</label>
        <EditProfileImage />
        <div className="input-group" ref={inputs}>
          <label>First Name</label>
          <input placeholder="First Name" name="firstName" type="text" defaultValue={state.user.firstName} />

          <label>Last Name</label>
          <input placeholder="Last Name" name="lastName" type="text" defaultValue={state.user.lastName} />

          <label>Username</label>
          <input placeholder="Username" name="username" type="text" defaultValue={state.user.username} />

          <label>Email</label>
          <input placeholder="Email" name="email" type="email" defaultValue={state.user.email} />

          <label>Phone</label>
          <input placeholder="Phone Number" name="phone" type="number" defaultValue={state.user.phone} />

          <ShouldRender if={state.user.accountType === 'designer'}>
            <label>Years of Experience</label>
            <input placeholder="Experience" name="experience" type="number" defaultValue={state.user.experience} />
          </ShouldRender>

          <label>About</label>
          <textarea placeholder="Description" name="description" rows={8} defaultValue={state.user.about}>
          </textarea>
        </div>
      </form>
      <Footer />
    </section>
  )
}

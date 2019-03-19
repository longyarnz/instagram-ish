import React, { useState } from 'react';
import Gallery from '../components/Gallery';
import Banner from '../components/Banner';
import MenuBar from '../components/MenuBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Profile(props) {
  const profileState = useState(0);
  const { dispatch, state, goTo } = props;
  const fullName = state.user.firstName + 
    ' ' + state.user.lastName;

  return (
    <section className="profile">
      <NavBar
        dispatch={dispatch}
        state={state}
        goTo={goTo}
        menuIsOpened={true}
        goBack={() => goTo('./pages/NewsFeed')}
      />
      <Banner 
        goTo={goTo} 
        src={state.user.photo}
        fullName={fullName}
      />
      <MenuBar tabs={profileState} {...props} />
      <Gallery tabs={profileState} {...props} />
      <Footer />
    </section>
  )
}

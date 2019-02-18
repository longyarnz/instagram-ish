import React, { useState } from 'react';
import Gallery from '../components/Gallery';
import Banner from '../components/Banner';
import MenuBar from '../components/MenuBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Profile(props) {
  const profileState = useState(0);

  return (
    <section className="profile">
      <NavBar />
      <Banner goTo={props.goTo} />
      <MenuBar tabs={profileState} {...props} />
      <Gallery tabs={profileState} {...props} />
      <Footer />
    </section>
  )
}

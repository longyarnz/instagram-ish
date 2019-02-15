import React, { useState } from 'react';
import Banner from '../components/Banner';
import MenuBar from '../components/MenuBar';
import Gallery from '../components/Gallery';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Profile(props) {
  const profileState = useState(0);

  return (
    <section className="profile">
      <NavBar />
      <Banner />
      <MenuBar state={profileState} />
      <Gallery state={profileState} />
      <Footer />
    </section>
  )
}

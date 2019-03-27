import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import Banner from '../components/Banner';
import MenuBar from '../components/MenuBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function ViewProfile(props) {
  const profileState = useState(0);

  useEffect(() => {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';

    return () => {
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      document.scrollingElement.scrollTop = 0;
    }
  }, []);

  const { dispatch, state, goTo } = props;
  const fullName = `${state.viewUser.firstName} ${state.viewUser.lastName}`;

  return (
    <section className="profile view-profile">
      <NavBar
        dispatch={dispatch}
        state={state}
        goTo={goTo}
        menuIsOpened={true}
        goBack={() => goTo('./pages/NewsFeed')}
      />
      <Banner
        goTo={goTo}
        src={state.viewUser.photo}
        fullName={fullName}
        userIsSuperUser={false}
      />
      <MenuBar tabs={profileState} />
      <Gallery
        tabs={profileState}
        userIsSuperUser={false}
        emptyDivMessage={`${state.viewUser.username} has 0 post`}
        state={{
          user: state.viewUser,
          posts: state.posts,
          token: null,
          isChangingLikeStatus: null,
          likes: [],
          userIsLoggedIn: false,
          userId: state.viewUser.id
        }}
      />
      <Footer />
    </section>
  )
}
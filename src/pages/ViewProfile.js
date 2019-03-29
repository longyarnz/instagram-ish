import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import Banner from '../components/Banner';
import MenuBar from '../components/MenuBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShouldRender from '../components/ShouldRender';
import { FullPageLoader } from '../components/FullPageSpinner';
import { GET_USER } from '../Actions';

export default function ViewProfile(props) {
  const profileState = useState(0);
  const [dataIsFetched, setDataIsFetched] = useState(false);

  useEffect(() => {
    document.getElementsByTagName('html')[0].style.overflowY = 'auto';

    return () => {
      document.scrollingElement.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if(!props.state.viewUser.email) {
      GET_USER(props.dispatch, props.token);
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

      <ShouldRender if={!props.state.viewUser.email}>
        <FullPageLoader width={'50vw'} className="loader" />
      </ShouldRender>

      <ShouldRender if={props.state.viewUser.email}>
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
          isViewingFromOwnProfile={false}
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
      </ShouldRender>
    </section>
  )
}
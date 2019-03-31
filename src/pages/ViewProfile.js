import React, { useState, useEffect, useRef } from 'react';
import Gallery from '../components/Gallery';
import Banner from '../components/Banner';
import MenuBar from '../components/MenuBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShouldRender from '../components/ShouldRender';
import { FullPageLoader } from '../components/FullPageSpinner';
import { GET_USER } from '../Actions';

export default function ViewProfile(props) {
  const _this = useRef(null);
  const profileState = useState(0);
  const [viewUser, setViewUser] = useState({});
  const [error, setError] = useState(false);
  // const [dataIsFetched, setDataIsFetched] = useState(false);
  const { dispatch, state, goTo, token } = props;

  useEffect(() => {
    _this.current = 'MOUNTED';
    return () => {
      _this.current = 'UNMOUNTED';
    }
  }, []);

  useEffect(() => {
    document.getElementsByTagName('html')[0].style.overflowY = 'auto';

    return () => {
      document.scrollingElement.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    console.log(state.viewUser);
    if(!props.state.viewUser.email) {
      const callback = user => {
        if(_this.current === 'UNMOUNTED') return;
        setViewUser(user);
      }
      
      const onError = () => {
        if(_this.current === 'UNMOUNTED') return;
        setError(true);
      }

      GET_USER(token, state.viewUser.id, callback, onError);
    }
  }, []);

  const user = { ...state.viewUser, ...viewUser }; 
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <section className="profile view-profile">
      <NavBar
        dispatch={dispatch}
        state={state}
        goTo={goTo}
        menuIsOpened={true}
        goBack={() => goTo('./pages/NewsFeed')}
      />

      <ShouldRender if={!error && !user.email}>
        <FullPageLoader className="loader" />
      </ShouldRender>

      <ShouldRender if={error}>
        <div className="empty">Failed to fetch user</div>
      </ShouldRender>

      <ShouldRender if={user.email}>
        <Banner
          goTo={goTo}
          src={user.photo}
          fullName={fullName}
          userIsSuperUser={false}
        />
        <MenuBar tabs={profileState} />
        <Gallery
          tabs={profileState}
          userIsSuperUser={false}
          isViewingFromOwnProfile={false}
          emptyDivMessage={`${user.username} has 0 post`}
          state={{
            user,
            posts: state.posts,
            token: null,
            isChangingLikeStatus: null,
            likes: [],
            userIsLoggedIn: false,
            userId: user.id
          }}
        />
        <Footer />
      </ShouldRender>
    </section>
  )
}
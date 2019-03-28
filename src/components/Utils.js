export function FlatList(props) {
  const { list, listView } = props;
  return Array.isArray(list) ? (
    list.map(listView)
  ) : null;
}

export function ForLoop(props) {
  let { times, loopView } = props;
  const loopItems = [];
  for (let i = 0; i < times; i++) {
    loopItems.push(
      loopView(i)
    )
  }
  return loopItems;
}

export function injectScrollSetter(dispatch, view, fn) {
  return function (props) {
    dispatch({
      type: 'SET SCROLL TOP',
      payload: {
        [view]: document.scrollingElement.scrollTop
      }
    });
    fn(props);
  }
}

export function animateScroll(top){
  let scrollPosition = 0;
  const scrollSpeed = 50;
  
  const y = setInterval(() => {
    if(scrollPosition >= top) clearInterval(y);
    document.scrollingElement.scrollTop = scrollPosition;
    scrollPosition += scrollSpeed;
  }, 0);
}

export function getProfilePictureUrl(props, origin) {
  return post => {
    if (post.userId === props.userId) {
      return props.profilePic || 'assets/img/user.png';
    }
    else {
      return post.profile_photo ?
        `${origin}/${post.profile_photo}` : 'assets/img/user.png';
    }
  };
}

export function calcTime(unix){
  const timeDifference = Date.now() - (unix * 1000);
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = seconds > 60 ? Math.floor(seconds / 60) : 0;
  const hours = minutes > 60 ? Math.floor(minutes / 60) : 0;
  const days = hours > 24 ? Math.floor(hours / 24) : 0;
  const weeks = days > 7 ? Math.floor(hours / 7) : 0;
  const months = weeks > 4 ? Math.floor(weeks / 4) : 0;
  const years = months > 12 ? Math.floor(months / 12) : 0;

  if(years > 0){
    const s = years > 1 ? 's' : '';
    return `${years} year${s} ago`;
  }

  else if(months > 0){
    const s = months > 1 ? 's' : '';
    return `${months} month${s} ago`;
  }

  else if(weeks > 0){
    const s = weeks > 1 ? 's' : '';
    return `${weeks} week${s} ago`;
  }

  else if(days > 0){
    const s = days > 1 ? 's' : '';
    return `${days} day${s} ago`;
  }

  else if(hours > 0){
    const s = hours > 1 ? 's' : '';
    return `${hours} hour${s} ago`;
  }

  else if(minutes > 0){
    const s = minutes > 1 ? 's' : '';
    return `${minutes} minute${s} ago`;
  }

  else if(seconds > 30){
    return `${seconds} seconds ago`;
  }

  else{
    return 'Just Now';
  }
}
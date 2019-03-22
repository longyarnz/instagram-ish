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
  let scrollPosition = 10;
  const scrollSpeed = 40;
  
  const y = setInterval(() => {
    if(scrollPosition >= top) clearInterval(y);
    document.scrollingElement.scrollTop = scrollPosition;
    scrollPosition += scrollSpeed;
  }, 0);
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
    return `${years} years ago`;
  }

  else if(months > 0){
    return `${months} months ago`;
  }

  else if(weeks > 0){
    return `${weeks} weeks ago`;
  }

  else if(days > 0){
    return `${days} days ago`;
  }

  else if(hours > 0){
    return `${hours} hours ago`;
  }

  else if(minutes > 0){
    return `${minutes} minutes ago`;
  }

  else if(seconds > 15){
    return `${seconds} seconds ago`;
  }

  else{
    return 'Just Now';
  }
}
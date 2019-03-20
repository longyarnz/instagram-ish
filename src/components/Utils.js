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
  let x = 10;
  const y = setInterval(() => {
    if(x >= top) clearInterval(y);
    document.scrollingElement.scrollTop = x;
    x += 10;
  }, 3);
}
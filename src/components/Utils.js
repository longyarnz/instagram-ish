/**
 * @function FlatList
 * @param {React.Props} props Data array and a render function.
 * @description Collects an array of data and render with a function.
 * @return {ReactComponent} An array of elements returned in the listView prop.
 */
export function FlatList(props) {
  const { list, listView } = props;
  return Array.isArray(list) ? (
    list.map(listView)
  ) : null;
}

/**
 * @function ForLoop
 * @param {React.Props} props An integer and a render function.
 * @description Uses a for...loop to render a view.
 * @return {ReactComponent} An array of loopView components.
 */
export function ForLoop(props) {
  let { times, loopView } = props;
  const loopItems = [];
  for(let i = 0; i < times; i++){
    loopItems.push(
      loopView(i)
    )
  }
  return loopItems;
}
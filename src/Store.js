export const InitialState = {
  stateIsLocked: false,
  mutations: [],
  scrollTop: null,
  view: './pages/NewsFeed',
  userIsLoggedIn: false,
  showDialog: false,
  showAppMenu: false,
  createPostImage: null,
  user: {
    firstName: 'Olalekan',
    lastName: 'Ayodele',
    email: 'longyarnz@gmail.com',
    username: 'LekanMedia',
    accountType: 'Fashion Designer',
    phone: '08082935102',
    brand: 'LekanMedia Inc.',
    experience: 0,
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    \nConsequatur odio sit perferendis totam, et mollitia at tempora repellendus!
    \nVeniam tempore officia non recusandae, quae mollitia amet inventore molestias molestiae repudiandae!`
  }
}

export function Reducers(state, action) {
  if(state.stateIsLocked && action.type !== 'UNLOCK STATE') return;

  const mutations = [...state.mutations, action.type];

  switch (action.type) {
    case 'LOCK STATE':
      return { ...state, mutations, stateIsLocked: true }

    case 'UNLOCK STATE':
      return { ...state, mutations, stateIsLocked: false }

    case 'CHANGE VIEW':
      return { ...state, mutations, view: action.payload }

    case 'SHOW DIALOG BOX':
      return { ...state, mutations, showDialog: true }

    case 'HIDE DIALOG BOX':
      return { ...state, mutations, showDialog: false }

    case 'SHOW APP MENU':
      return { ...state, mutations, showAppMenu: true }

    case 'HIDE APP MENU':
      return { ...state, mutations, showAppMenu: false }

    case 'LOG USER IN':
      return { ...state, mutations, userIsLoggedIn: true, user: { ...InitialState.user, ...state.user, ...action.payload } }

    case 'LOG USER OUT':
      return { ...state, mutations, userIsLoggedIn: false, user: null }

    case 'UPGRADE CUSTOMER ACCOUNT':
      return { ...state, mutations, user: { ...state.user, accountType: 'Fashion Designer' } }

    case 'STORE POST IMAGE':
      return { ...state, mutations, createPostImage: action.payload }

    case 'NULL POST IMAGE':
      return { ...state, mutations, createPostImage: null }

    case 'SET SCROLLTOP':
      return { ...state, mutations, scrollTop: action.payload }

    case 'NULL SCROLLTOP':
      return { ...state, mutations, scrollTop: null }

    default: return state;
  }
}
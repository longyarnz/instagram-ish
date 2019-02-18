export const InitialState = {
  mutations: [],
  view: './pages/NewsFeed',
  userIsLoggedIn: false,
  user: {
    firstName: 'Olalekan',
    lastName: 'Ayodele',
    email: 'longyarnz@gmail.com',
    username: 'LekanMedia',
    accountType: 'customer',
    phone: '08082935102',
    experience: 3,
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    \nConsequatur odio sit perferendis totam, et mollitia at tempora repellendus!
    \nVeniam tempore officia non recusandae, quae mollitia amet inventore molestias molestiae repudiandae!`
  }
}

export function Reducers(state, action) {
  const mutations = [...state.mutations, action.type];

  switch (action.type) {
    case 'CHANGE VIEW':
      return { ...state, mutations, view: action.payload }

    case 'REGISTER USER':
      return { ...state, mutations, userIsLoggedIn: true, user: action.payload }

    case 'LOG USER IN':
      return { ...state, mutations, userIsLoggedIn: true, user: action.payload }

    case 'LOG USER OUT':
      return { ...state, mutations, userIsLoggedIn: false, user: null }

    case 'UPGRADE CUSTOMER ACCOUNT':
      return { ...state, mutations, user: { ...state.user, accountType: 'designer' } }

    default: return state;
  }
}
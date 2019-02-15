export const InitialState = {
  mutations: [],
  view: './pages/NewsFeed',
  userIsLoggedIn: false,
  user: null
}

export function Reducers(state, action) {
  const mutations = [ ...state.mutations, action.type ];
  
  switch (action.type) {
    case 'CHANGE VIEW':
      return { ...state, mutations, view: action.payload }

    case 'REGISTER USER':
      return { ...state, mutations, userIsLoggedIn: true, user: action.payload }

    case 'LOG USER IN':
      return { ...state, mutations, userIsLoggedIn: true, user: action.payload }

    case 'LOG USER OUT':
      return { ...state, mutations, userIsLoggedIn: false, user: null }

    default: return state;
  }
}
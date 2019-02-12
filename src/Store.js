export const InitialState = {
  mutations: [],
  view: './pages/Register',
  isUserLoggedIn: false
}

export function Reducers(state, action) {
  const mutations = state.mutations.concat([action.type]);
  
  switch (action.type) {
    case 'CHANGE VIEW':
      return { ...state, mutations, view: action.payload }
    default: return state;
  }
}
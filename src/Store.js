export const InitialState = {
  stateIsLocked: false,
  mutations: [],
  scrollTop: null,
  view: './pages/NewsFeed',
  userIsLoggedIn: false,
  showDialog: false,
  showAppMenu: false,
  showNotifications: false,
  showSearch: false,
  showComment: false,
  createPostImage: null,
  hasPosts: false,
  hasComments: false,
  posts: [],
  postId: null,
  comments: null,
  token: null,
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
  if (state.stateIsLocked && action.type !== 'UNLOCK STATE') return;

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

    case 'SHOW NOTIFICATIONS':
      return { ...state, mutations, showNotifications: true }

    case 'HIDE NOTIFICATIONS':
      return { ...state, mutations, showNotifications: false }

    case 'SHOW SEARCH':
      return { ...state, mutations, showSearch: true }

    case 'HIDE SEARCH':
      return { ...state, mutations, showSearch: false }

    case 'SHOW COMMENTS':
      return { ...state, mutations, showComment: true, postId: action.payload }

    case 'HIDE COMMENTS':
      return { ...state, mutations, showComment: false }

    case 'FETCH POSTS':
      return { ...state, mutations, posts: action.payload, hasPosts: true }

    case 'CLEAR POSTS':
      return { ...state, mutations, posts: [], hasPosts: false }

    case 'FETCH COMMENTS':
      return { ...state, mutations, comments: {...state.comments, ...action.payload}, hasComments: true }

    case 'CLEAR COMMENTS':
      return { ...state, mutations, comments: [], hasComments: false }

    case 'LOG USER IN':
      const { user, token } = action.payload;
      return {
        ...state,
        mutations,
        token,
        userIsLoggedIn: true,
        user: process.env.NODE_ENV === 'production' ? {
          firstName: user.fullName.split(' ')[0],
          lastName: user.fullName.split(' ')[1],
          email: user.email,
          sex: user.sex,
          username: user.username,
          accountType: user.userType === 'user' ? 'Fashion Enthusiast' : 'Fashion Designer',
          phone: user.phone,
          brand: user.brandName,
          experience: user.experience || 0,
          about: user.about || 0,
          photo: user.photoPath
        } : { ...InitialState.user, ...state.user, ...action.payload }
      }

    case 'LOG USER OUT':
      return { ...state, mutations, userIsLoggedIn: false, user: {}, token: null }

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

    case 'RESTORE STATE':
      return { ...state, mutations, ...action.payload }

    case 'CACHE STATE':
      localStorage.staleState = JSON.stringify({
        token: state.token,
        userIsLoggedIn: state.userIsLoggedIn,
        user: state.user
      });
      return state;

    default: return state;
  }
}
export const InitialState = {
  stateIsLocked: false,
  mutations: [],
  scrollTop: {
    './pages/NewsFeed': null,
    './pages/EditProfile': null,
    './pages/Profile': null,
    './pages/Login': null,
    './pages/Register': null,
  },
  view: './pages/NewsFeed',
  modalView: null,
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
  comments: {},
  likes: [],
  isSendingComment: false,
  isChangingLikeStatus: [],
  isFetchingComments: false,
  token: null,
  user: {},
  upgradeAccount: false,
  categories: [
    { "id": 1, "name": "Gown" },
    { "id": 2, "name": "Blouse" },
    { "id": 3, "name": "Men Suit" },
    { "id": 4, "name": "Female Suit" },
    { "id": 5, "name": "Skirt" },
    { "id": 6, "name": "Trousers" },
    { "id": 7, "name": "Agbada" },
    { "id": 8, "name": "Buba" },
    { "id": 9, "name": "Ankara" },
    { "id": 10, "name": "Jeans" },
    { "id": 11, "name": "Jump Suit" },
    { "id": 12, "name": "Others" }
  ]
}

export function Reducers(state, action) {
  let posts, comments, likes, isChangingLikeStatus;
  const { type, payload } = action;

  if (state.stateIsLocked && type !== 'UNLOCK STATE') return;

  const mutations = [...state.mutations, type];

  switch (type) {
    case 'EDIT USER PROFILE':
    case 'LOG USER IN':
      const { user, token } = payload;
      return {
        ...state,
        mutations,
        token,
        userIsLoggedIn: true,
        user: {
          id: user.userId,
          firstName: user.first_name || user.fullName.split(' ')[0],
          lastName: user.last_name || user.fullName.split(' ')[1],
          email: user.email,
          sex: user.sex,
          address: user.address,
          username: user.username,
          accountType: user.userType === 'user' ? 'Fashion Enthusiast' : 'Fashion Designer',
          phone: user.phone,
          brand: user.brand_name || user.brandName,
          experience: user.experience || 0,
          about: user.about || '',
          photo: user.photo || user.photoPath
        }
      }

    case 'LOG USER OUT':
      localStorage.removeItem('staleState');
      return InitialState;

    case 'LOCK STATE':
      return { ...state, mutations, stateIsLocked: true }

    case 'UNLOCK STATE':
      return { ...state, mutations, stateIsLocked: false }

    case 'CHANGE VIEW':
      return { ...state, mutations, view: payload }

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
      return { ...state, mutations, showComment: true, postId: payload }

    case 'HIDE COMMENTS':
      return { ...state, mutations, showComment: false }

    case 'FETCH POSTS':
      return { ...state, mutations, posts: payload, hasPosts: true }

    case 'CLEAR POSTS':
      return { ...state, mutations, posts: [], hasPosts: false }

    case 'ADD NEW POST':
      return { ...state, mutations, posts: [...payload, ...state.posts] }

    case 'FETCH COMMENTS':
      return { ...state, mutations, comments: { ...state.comments, ...payload }, hasComments: true }

    case 'CLEAR COMMENTS':
      return { ...state, mutations, comments: [], hasComments: false }

    case 'ADD NEW COMMENT':
      comments = { ...state.comments };
      comments = comments[payload.postId] || [];
      comments.push(payload.comment);
      comments = { [payload.postId]: comments }
      posts = [...state.posts];
      posts.forEach(post => post.post_id === payload.postId && ++post.comments_count);
      return { ...state, mutations, comments: { ...state.comments, ...comments }, hasComments: true, posts }

    case 'START CHANGING LIKE STATUS':
      return { ...state, mutations, isChangingLikeStatus: [...state.isChangingLikeStatus, payload] }

    case 'STOP CHANGING LIKE STATUS':
      isChangingLikeStatus = [...state.isChangingLikeStatus];
      isChangingLikeStatus = isChangingLikeStatus.filter(i => i !== payload);
      return { ...state, mutations, isChangingLikeStatus }

    case 'LIKE A POST':
      posts = [...state.posts];
      posts.forEach(post => {
        if (post.post_id === payload) {
          ++post.likes_count;
          post.liked_by_me = true;
        }
      });
      return { ...state, mutations, likes: [...state.likes, payload], posts }

    case 'UNLIKE A POST':
      likes = [...state.likes];
      likes = likes.filter(i => i !== payload);
      posts = [...state.posts];
      posts.forEach(post => {
        if (post.post_id === payload) {
          --post.likes_count;
          post.liked_by_me = false;
        }
      });
      return { ...state, mutations, likes, posts }

    case 'UPGRADE CUSTOMER ACCOUNT':
      return { ...state, mutations, upgradeAccount: true }

    case 'STORE POST IMAGE':
      return { ...state, mutations, createPostImage: payload }

    case 'NULL POST IMAGE':
      return { ...state, mutations, createPostImage: null }

    case 'SET SCROLLTOP':
      return { ...state, mutations, scrollTop: payload }

    case 'NULL SCROLLTOP':
      return { ...state, mutations, scrollTop: null }

    case 'SET MODAL VIEW':
      return { ...state, mutations, modalView: payload }

    case 'NULL MODAL VIEW':
      return { ...state, mutations, modalView: null }

    case 'SET FETCHING STATUS FOR COMMENTS':
      return { ...state, mutations, isFetchingComments: true }

    case 'NULL FETCHING STATUS FOR COMMENTS':
      return { ...state, mutations, isFetchingComments: false }

    case 'SET SENDING STATUS FOR COMMENTS':
      return { ...state, mutations, isSendingComment: true }

    case 'NULL SENDING STATUS FOR COMMENTS':
      return { ...state, mutations, isSendingComment: false }

    case 'SET SCROLL TOP':
      return { ...state, mutations, scrollTop: {...state.scrollTop, ...payload} }

    case 'RESTORE STATE':
      return { ...state, mutations, ...payload }

    case 'CACHE STATE':
      localStorage.staleState = JSON.stringify({
        token: state.token ? state.token : null,
        userIsLoggedIn: state.userIsLoggedIn ? state.userIsLoggedIn : false,
        user: state.user ? state.user : {},
        hasPosts: state.hasPosts ? state.hasPosts : false,
        posts: state.posts.length > 0 ? state.posts : []
      });
      return { ...state, mutations };

    default: return state;
  }
}
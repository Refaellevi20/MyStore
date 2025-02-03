export const SET_toyS = 'SET_toyS'
export const SAVE_toyS = 'SAVE_toyS'
export const TOGGLE_LIKE_toy = 'LIKE_toyS'
export const REMOVE_toyS = 'REMOVE_toyS'
export const UPDATE_toyS = 'UPDATE_toyS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_LABELS = 'SET_LABELS'
export const UNDO_TOGGLE_LIKE_toy = 'UNDO_LIKE_toy'


const initialState = {
  toys: [],
  labels: [],
  lastLikedtoy: null,
  isLoading: false,
}

export function toyReducer(state = initialState, action) {
  let toys = []

  switch (action.type) {
    case SET_toyS:
      return { ...state, toys: action.toys }
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }
    case SAVE_toyS:
      return { ...state, toys: [...state.toys, action.toy] }
    case UPDATE_toyS:
      toys = state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
      return { ...state, toys }
    case REMOVE_toyS:
      toys = state.toys.filter((toy) => toy._id !== action.toyId)
      return { ...state, toys }
    case SET_LABELS:
      return { ...state, labels: action.labels }
    case TOGGLE_LIKE_toy:
      const likedtoy = state.toys.find(toy => toy._id === action.toyId)
      if (!!likedtoy.likedByUsers.find(user => user._id === action.user._id)) {
        likedtoy.likedByUsers = likedtoy.likedByUsers.filter(user => user._id !== action.user._id)
      } else {
        likedtoy.likedByUsers = [...likedtoy.likedByUsers, action.user]
      }
      toys = state.toys.map(toy => (toy._id === action.toyId) ? likedtoy : toy)
      return { ...state, toys, lastLikedtoy: { toyId: action.toyId, user: action.user } }
    case UNDO_TOGGLE_LIKE_toy:
      if (state.lastLikedtoy) {
        const lastLikedtoy = state.toys.find(toy => toy._id === state.lastLikedtoy.toyId)
        if (lastLikedtoy.likedByUsers.find(user => user._id === action.user._id)) {
          lastLikedtoy.likedByUsers = lastLikedtoy.likedByUsers.filter(user => user._id !== action.user._id)
        } else {
          lastLikedtoy.likedByUsers = [...lastLikedtoy.likedByUsers, action.user]
        }
        return { ...state, toys: [...state.toys, lastLikedtoy], lastLikedtoy: null }
      }
      break
    default:
      return { ...state }

  }
}

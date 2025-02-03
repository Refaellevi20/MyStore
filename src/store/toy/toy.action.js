import { toyService } from '../../services/toy.service.local.js'
import { userService } from '../../services/user.service.local.js'
import { store } from '../store.js'

import { REMOVE_toyS, SAVE_toyS, SET_toyS, TOGGLE_LIKE_toy, UNDO_TOGGLE_LIKE_toy, UPDATE_toyS, } from './toy.reducer'

import { LOADING_DONE, LOADING_START } from '../system.reducer.js'
//  Load toys
export async function loadtoys(filterBy = {}, sortBy = {}) {
  store.dispatch({ type: LOADING_START })
  try {
    try {
      const toys = await toyService.query(filterBy, sortBy)
      store.dispatch({ type: SET_toyS, toys: toys })
    } catch (err) {
      console.log('Had issues loading toys: ', err)
      throw err
    }
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

// Save toy
export async function savetoy(toy) {
  const type = toy._id ? UPDATE_toyS : SAVE_toyS
  try {
    const savedtoy = await toyService.save(toy)
    store.dispatch({ type, toy: savedtoy })
    return savedtoy
  } catch (err) {
    console.error(`Cannot save toy: `, err)
    throw err
  }
}

// Delete toy
export async function removetoy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_toyS, toyId })
  } catch (err) {
    console.log('Cannot delete toy: ', err)
    throw err
  }
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
export async function onLiketoyOptimistic(toyId) {
  const user = userService.getLoggedinUser()
  store.dispatch({ type: TOGGLE_LIKE_toy, toyId, user })
  try {
    const toy = await toyService.getById(toyId)
    const likedByUser = toy.likedByUsers.filter(
      (miniUser) => miniUser._id === user._id
    )

    if (likedByUser.length) {
      toy.likedByUsers.filter((miniUser) => miniUser._id !== user._id)
      await toyService.removetoyLike(toyId)
    } else {
      toy.likedByUsers.push(user)
      await toyService.addtoyLike(toyId)
    }
  } catch (err) {
    console.log('Cannot update toy', err)
    store.dispatch({
      type: UNDO_TOGGLE_LIKE_toy,
    })
  }
}

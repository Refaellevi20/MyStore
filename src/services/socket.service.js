import io from 'socket.io-client'
import { userService } from './user/user.service.remote.js'



export const SOCKET_EVENT_EDIT_MSG = 'chat-edit-msg';
export const SOCKET_EMIT_EDIT_MSG = 'chat-emit-edit-msg';

export const SOCKET_EMIT_REMOVE_MSG = 'chat-remove-msg'
export const SOCKET_EMIT_NEW_MSG = 'chat-new-msg'
export const SOCKET_EVENT_REMOVE_MSG = 'chat-msg-removed'
// export const SOCKET_EMIT_NEW_MSG = 'chat-new-msg'

// export const SOCKET_EVENT_ORDER_ADDED = 'order-added'
// export const SOCKET_EVENT_ORDER_FROM_YOU = 'order-from-you'
// export const SOCKET_EVENT_TYPING = 'chat-add-typing';
// export const SOCKET_EVENT_STOP_TYPING = 'chat-remove-typing';
// export const SOCKET_EMIT_ORDER_WATCH = 'order-watch'


export const SOCKET_EVENT_GROUP_MSG = 'group-chat-add-msg'
export const SOCKET_EMIT_GROUP_MSG = 'group-chat-send-msg'
export const SOCKET_EVENT_GROUP_MSG_REMOVE = 'group-chat-remove-msg'
export const SOCKET_EMIT_GROUP_MSG_REMOVE = 'group-chat-emit-remove-msg'
export const SOCKET_EMIT_JOIN_GROUP = 'join-group-chat'
export const SOCKET_EMIT_LEAVE_GROUP = 'leave-group-chat'
export const SOCKET_EVENT_USER_TYPING_GROUP = 'user-typing-group'
export const SOCKET_EMIT_USER_TYPING_GROUP = 'set-user-typing-group'

export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'

export const SOCKET_EVENT_ORDER_FOR_YOU = 'order-for-you'
export const SOCKET_EVENT_ORDER_UPDATED = 'order-status-update'
export const SOCKET_EVENT_NEW_MESSAGE = 'new-order-notification'


const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl = (process.env.NODE_ENV === 'production') 
? 'wss://1pbjs7u73e.execute-api.eu-west-1.amazonaws.com/production/'
: 'ws://localhost:3030';
export const socketService = createSocketService()



// export const socketService = createSocketService()
window.socketService = socketService
socketService.setup()


function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(()=>{
        const user = userService.getLoggedinUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    login() {   
    },
    logout() {   
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    // Functions for easy testing of pushed data
    testChatMsg() {
      this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
    },
    testUserUpdate() {
      this.emit(SOCKET_EVENT_USER_UPDATED, {...userService.getLoggedinUser(), score: 555})
    }
  }
  window.listenersMap = listenersMap
  return socketService
}


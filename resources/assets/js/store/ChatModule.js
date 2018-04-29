import * as firebase from 'firebase'
import axios from 'axios'
import Router from '../router'
const ChatModule = {
  state: {
    chats: []
  },
  mutations: {
    setMessagesEmpty (state) {
      state.messages = []
    },
    setChats (state, payload) {
      state.chats = payload
    }
  },
  actions: {
    sendMessage ({commit}, payload) {
      let key = payload.chatID
      const message = {
        chatID: payload.chatID,
        userId: payload.userId,
        user: payload.username,
        content: payload.content,
        date: payload.date
      }
      console.log(message)
      axios.post('http://127.0.0.1:8000/api/messages',message)
        .then((response) => {
          console.log(response.data)
          firebase.database().ref('messages').child(key).child('messages').push(message)
          .then(
            (data) => {
            }
          )
          .catch(
            (error) => {
              console.log(error)
            }
          )
        },(err) => {
          console.log(err)
        })
    },
    createChat ({commit}, payload) {
        console.log(payload)
            axios.post('http://127.0.0.1:8000/api/createChat',payload).then((response) => {
                const key = response.data[0].id
                Router.push('/chat/' + key)
            }, (err) => {
            console.log(err)
        })
    }
  },
  getters: {
    messages (state) {
      return state.messages
    },
    chats (state) {
      return state.chats
    }
  }
}

export default ChatModule

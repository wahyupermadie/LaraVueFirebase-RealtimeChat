import * as firebase from 'firebase'
import axios from 'axios'
import {getCache,storedCache} from '../cache'
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
        date: payload.date,
        flag:{
              user1: '',
              user2: ''
            }
      }
      axios.post('http://127.0.0.1:8000/api/messages',message)
        .then((response) => {
          console.log(message)
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
        console.log(payload.friend)
            axios.post('http://127.0.0.1:8000/api/createChat',payload).then((response) => {
                const key = response.data
                storedCache(key,payload.friend)
                Router.push('/chat/' + key)
            }, (err) => {
            console.log(err)
        })
    },
    updateChat({commit},payload){
      let chatID = payload.chatID
      const endchat = {
        flag: payload.flag,
        date: payload.date
      }
      // console.log(payload)
      let ref = firebase.database().ref('messages').child(chatID).child('messages')
      ref.once("value", function(snapshot) {
        let newPost = snapshot.val();
        // The callback function will only get called once since we return true
        snapshot.forEach(function(childSnapshot) {
            let key = childSnapshot.key;
            let flags = firebase.database().ref('messages/'+chatID+'/messages/'+key)
            flags.once("value",function (snap) {
              let data = snap.val();
              let flag_1 = data.flag.user1;
              let flag_2 = data.flag.user2;
              let newFlag_id = ''
              let oldFlag_id = ''
              if(flag_1 == ''){
                newFlag_id = payload.flag
              }else if(flag_1 == payload.flag){
                console.log('elif 1')
                newFlag_id = payload.flag
                oldFlag_id = flag_2
              }else if(flag_1 != payload.flag){
                console.log('elif 2')
                oldFlag_id = flag_1
                newFlag_id = payload.flag
              }else{
                console.log('hehehe')
              }
              console.log(flag_1)
              let flags = {
                user1: newFlag_id, 
                user2: oldFlag_id
              }
              console.log(flags)
              firebase.database().ref('messages/'+chatID+'/messages/'+key)
                .update({date: payload.date,flag: flags})
            })
            // console.log(flags.flag)
            // firebase.database().ref('messages/'+chatID+'/messages/'+key).update(endchat)
          });
          Router.push('/home')
      });
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

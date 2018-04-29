import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Router from '../router'
import * as firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

import AuthModule from '../store/AuthModule'
import ChatModule from '../store/ChatModule'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth: AuthModule,
    chat: ChatModule
  },
  state: {
    loadedFriends:[],
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })],
  mutations: {
    setFriends (state, payload){
        state.loadedFriends = payload
    },
  },
  actions: {
    loadFriends({commit}){
        console.log("Load Friends")
        const user = {
            user_id : localStorage.getItem('user_id')
        } 
        axios.post('http://127.0.0.1:8000/api/user', user).then((response)=>{
            commit('setFriends', response.data)
            console.log('loaded friends');
        }, (err) => {
            console.log(err)
        })
    },
  },
  getters: {
    friends(state){
        return state.loadedFriends
    },
    getUserId(){
        return localStorage.getItem('user_id');
    }
  }
})

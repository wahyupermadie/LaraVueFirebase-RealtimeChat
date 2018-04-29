import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
import Router from '../router'

const AuthModule = {
  state: {
    user: []
  },
  mutations: {
    setUser (state, payload) {
        state.user = payload
        console.log('di mutation setUser ==' + payload)
    },
  },
  plugins: [createPersistedState()],
  actions: {
    login({ commit }, payload) {
        console.log(payload)
        axios.post('http://127.0.0.1:8000/api/auth/login',payload).then((response) => {
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('user_id',response.data.user.id)
            localStorage.setItem('user_name',response.data.user.name)
            localStorage.setItem('access_token',response.data.access_token)
            // const newUser = {
            //   id: response.data.user.id,
            //   name: response.data.user.name
            // }
            commit('setUser', response.data)
            Router.push('/home')
        }, (err) => {
        console.log(err)
        })
    },
    register({ commit }, payload) {
        console.log(payload)
        axios.post('http://127.0.0.1:8000/api/auth/signup',payload).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('user_id',response.data.user.id)
            localStorage.setItem('user_name',response.data.user.name)
            localStorage.setItem('access_token',response.data.access_token)
            commit('setUser', response.data)
            Router.push('/home')
        }, (err) => {
        console.log(err)
        })
    },
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}

export default AuthModule

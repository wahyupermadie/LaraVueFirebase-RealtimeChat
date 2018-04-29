require('./bootstrap');
import Vue from 'vue'
import router from './router'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css' 
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import * as firebase from 'firebase'
import { store } from './store'
import App from './components/App'
Vue.config.productionTip = false;

Vue.use(Vuetify)
Vue.use(VueResource)
Vue.use(VueRouter)
const app = new Vue({
    store,
    el: '#app',
    router,
    render: h=> h(App),
    created () {
    firebase.initializeApp({
        apiKey: 'AIzaSyA-OySA84xknPPkQUBDhIKR6v7FyzDMHvo',
        authDomain: 'vue-chat-id.firebaseapp.com',
        databaseURL: 'https://vue-chat-id.firebaseio.com',
        projectId: 'vue-chat-id',
        storageBucket: 'vue-chat-id.appspot.com',
        messagingSenderId: '1033491422081'
        })
    }
});
router.beforeEach((to, from, next) => {
    next()
    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && user === null && user === undefined) {
        // redirect to login page
        next({ path: '/signin' })
        return
    }
    const user = window.localStorage.getItem('user')
    // if logged in redirect to dashboard
    if(to.path === '/signin' && user !== null && user !== undefined) {
        next({ path: '/home' })
        return
    }
})

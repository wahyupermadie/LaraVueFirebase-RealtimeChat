import Vue from 'vue'
import Home from '../components/Home.vue';
import Chat from '../pages/chatIndex.vue';
import Login from '../components/Login.vue';
import Register from '../components/Signup.vue';
import Router from 'vue-router';
const router = new Router({
    mode: 'history',
    routes: [
        { 
            path: '/home', 
            component: Home,
            meta: {
                title : "Home View", 
                requiresAuth: true 
            } 
        },
        { 
            path: '/chat/:id', 
            component: Chat,
            props:true,
            meta: {
                title : "Chat View", 
                requiresAuth: true 
            }  
        },
        { 
            path: '/signin', 
            component: Login 
        },
        { 
            path: '/signup', 
            component: Register 
        }
    ]
});

export default router;
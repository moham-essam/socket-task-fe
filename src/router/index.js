import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Chat from "../views/Chat";
import Register from "../views/Register";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            const isLoggedIn = localStorage.getItem('accessToken');
            if (isLoggedIn) {
                router.push('chat');
            } else {
                next();
            }
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: (to, from, next) => {
            const isLoggedIn = localStorage.getItem('accessToken');
            if (isLoggedIn) {
                router.push('chat');
            } else {
                next();
            }
        }
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat,
        beforeEnter: (to, from, next) => {
            const isLoggedIn = localStorage.getItem('accessToken');
            if (isLoggedIn) {
                next();
            } else {
              router.push('/');
            }
        }
    },
]

const router = new VueRouter({
    routes
})

export default router

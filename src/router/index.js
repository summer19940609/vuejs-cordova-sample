import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'
import Fund from '@/views/Fund'
import Login from '@/views/Login'
import V2ex from '@/views/V2ex'
import Nga from '@/views/Nga';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Fund',
            component: Fund
        },
        {
            path: '/fund',
            name: 'Fund',
            component: Fund
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/v2ex',
            name: 'V2ex',
            component: V2ex
        },
        {
            path: '/nga',
            name: 'Nga',
            component: Nga
        }
    ]
})

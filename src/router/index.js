import Vue from 'vue';
import Router from 'vue-router';
import Fund from '@/views/Fund';
import Login from '@/views/Login';
import Clear from '@/views/Clear';
import V2ex from '@/views/V2ex';
import Nga from '@/views/Nga';
import Setting from '@/views/Setting';
import Profile from '@/views/Profile';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Fund',
            component: Fund,
        },
        {
            path: '/fund',
            name: 'Fund',
            component: Fund,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/v2ex',
            name: 'V2ex',
            component: V2ex,
        },
        {
            path: '/nga',
            name: 'Nga',
            component: Nga,
        },
        {
            path: '/clear',
            name: 'Clear',
            component: Clear,
        },
        {
            path: '/setting',
            name: 'Setting',
            component: Setting,
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
        },
    ],
});

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Vibration from '@/views/Vibration'
import Flash from '@/views/Flash'
import Camera from '@/views/Camera'
import Nfc from '@/views/Nfc'
import Localisation from '@/views/Localisation'
import Fund from '@/views/Fund'
import Login from '@/views/Login'
import V2ex from '@/views/V2ex'
import Topics from '@/views/topics';
import Details from '@/views/details';
import HomeNga from '@/views/home_nga';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/vibration',
            name: 'Vibration',
            component: Vibration
        },
        {
            path: '/flash',
            name: 'Flash',
            component: Flash
        },
        {
            path: '/camera',
            name: 'Camera',
            component: Camera
        },
        {
            path: '/nfc',
            name: 'Nfc',
            component: Nfc
        },
        {
            path: '/localisation',
            name: 'Localisation',
            component: Localisation
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
            path: '/topics/:fid',
            name: 'topics',
            component: Topics
        },
        {
            path: '/details/:tid',
            name: 'details',
            component: Details
        },
        {
            path: '/home_nga',
            name: 'home_nga',
            component: HomeNga
        },

    ]
})

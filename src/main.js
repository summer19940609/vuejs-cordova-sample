import '@babel/polyfill';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router/index';
import axios from 'axios';
import store from './vuex/store';
import vantCompoents from '@/components/vant.config'
import { NativeHttp } from "./libs/nativeHttp";
// axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(vantCompoents)
Vue.prototype.$axios = axios
Vue.prototype.$nativeHttp = new NativeHttp

const init = () => {
    new Vue({
        vuetify,
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
};

document.addEventListener("deviceready", () => {
    // eslint-disable-next-line
    console.log("Ready, Render the App");
    init();
    window.open = window.cordova.InAppBrowser.open;
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp) {
    document.dispatchEvent(new CustomEvent("deviceready", {}));
}

import '@babel/polyfill';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router/index';
import axios from 'axios';
import Vant from 'vant';
import store from './vuex/store';
import 'vant/lib/index.css';

Vue.use(Vant);

// axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.config.productionTip = false

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
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp) {
    document.dispatchEvent(new CustomEvent("deviceready", {}));
}

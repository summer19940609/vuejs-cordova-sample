import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态
const store = new Vuex.Store({
    state: {
        LOADING: false,
        TITLE: 'cordova+vue'
    },
    mutations: {
        showLoading(state) {
            state.LOADING = true
        },
        hideLoading(state) {
            state.LOADING = false
        },
        setTitle(state, title) {
            state.TITLE = title
        }
    }
});

export default store;

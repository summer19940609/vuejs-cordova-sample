import Vue from 'vue';
import Vuex from 'vuex';

// 告诉 vue “使用” vuex
Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态
const store = new Vuex.Store({
    state: {
        LOADING: false
    },
    getters: {

    },
    mutations: {
        showLoading(state) {
            state.LOADING = true
        },
        hideLoading(state) {
            state.LOADING = false
        }
    },
    actions: {

    }
});

export default store;

<template>
    <div class="loading">
        <van-loading type="spinner" color="#1989fa" size="24px" vertical />
    </div>
</template>

<script>
import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading);

export default {
    name: 'LOADING',
    data() {
        return {}
    },
}
</script>
<style scoped>
.loading {
    position: fixed;
    z-index: 5;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

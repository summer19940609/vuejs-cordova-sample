<template>
    <v-container>
        <van-button type="info" @click="clearStorage">清除localStorage</van-button>
    </v-container>
</template>

<script>
export default {
    name: 'clear',
    data() {
        return {

        };
    },
    mounted() {
        this.$store.commit('setTitle', '缓存')
    },
    methods: {
        clearStorage() {
            localStorage.clear()
            this.$toast.success('清除缓存成功')
        }
    },
};
</script>

<style scoped>
</style>

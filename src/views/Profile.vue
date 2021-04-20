<template>
    <v-container>
        <van-image width="100" height="100" :src="avatar" />
        <img :src="avatar" alt="" />
    </v-container>
</template>

<script>
export default {
    name: 'profile',
    data() {
        return {
            avatar: ''
        }
    },
    mounted() {
        this.avatar = this.$store.state.userInfo.avatar
    },
    methods: {}
}
</script>

<style scoped></style>

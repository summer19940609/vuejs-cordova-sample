<template>
    <v-container>

    </v-container>
</template>

<script>
export default {
    name: 'setting',
    data() {
        return {

        };
    },
    mounted() {
        this.go2Login()
        const cookie = localStorage.getItem('ngaCookie')
        console.log(`====> ngaCookie => ${JSON.stringify(cookie)}`)
    },
    methods: {
        go2Login() {
            window.open('https://bbs.nga.cn/nuke/account_copy.html?login', '_blank', 'zoom=no')
        },
    }
}
</script>

<style scoped>
</style>

<template>
    <v-container>
        <van-image width="100" height="100" :src="avatar" />
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'profile',
    computed: {
        ...mapState(['userInfo'])
    },
    data() {
        return {
            avatar: ''
        }
    },
    mounted() {
        this.avatar = this.userInfo.avatar
    },
    methods: {}
}
</script>

<style scoped></style>

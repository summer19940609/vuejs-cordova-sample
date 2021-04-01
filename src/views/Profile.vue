<template>
    <v-container>
        <van-image width="100" height="100" :src="userInfo.avatar" />
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

        }
    },
    mounted() {
        
    },
    methods: {}
}
</script>

<style scoped></style>

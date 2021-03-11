<template>
    <v-container text-center class="fund-container">
        <van-pull-refresh
            v-model="isLoading"
            @refresh="onRefresh"
            class="refresh-box"
        >
            <van-row class="fund-index-item">
                <van-col span="6">上证指数</van-col>
                <van-col span="6">3436.83</van-col>
                <van-col span="6">79.09</van-col>
                <van-col span="6">2.36%</van-col>
            </van-row>
            <van-row class="fund-index-item">
                <van-col span="6">上证指数</van-col>
                <van-col span="6">3436.83</van-col>
                <van-col span="6">79.09</van-col>
                <van-col span="6">2.36%</van-col>
            </van-row>
            <van-row class="fund-index-item">
                <van-col span="6">上证指数</van-col>
                <van-col span="6">3436.83</van-col>
                <van-col span="6">79.09</van-col>
                <van-col span="6">2.36%</van-col>
            </van-row>
            <van-row class="fund-index-item">
                <van-col span="6">上证指数</van-col>
                <van-col span="6">3436.83</van-col>
                <van-col span="6">79.09</van-col>
                <van-col span="6">2.36%</van-col>
            </van-row>
        </van-pull-refresh>
    </v-container>
</template>

<script>
export default {
    name: 'fund',
    methods: {
        data: () => {
            return {
                isLoading: false,
                info: 12121212,
            };
        },
        mounted() {
            console.log('====> 1的值为: ', 1);
            this.getFundIndex();
        },
        openMenu: () => {
            document.dispatchEvent(new CustomEvent('toggleDrawer', {}));
        },
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        getFundIndex: () => {
            this.$axios
                .get('https://api.coindesk.com/v1/bpi/currentprice.json')
                .then((data) => console.log('====> data的值为: ', data));
        },
    },
};
</script>

<style scoped>
.fund-container {
    height: 100vh;
}
.refresh-box {
    height: 100%;
}
.fund-index-item {
    margin-top: 10px;
    font-size: 16px;
}
</style>

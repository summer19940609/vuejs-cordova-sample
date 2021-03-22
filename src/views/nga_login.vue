<template>
    <v-container class="login-container">
        <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh" success-text="刷新成功">
            <van-skeleton :row="3" :loading="isLoading">
                <van-cell
                    v-show="!isLoading"
                    v-for="item in list"
                    :key="item.tid"
                    :value="`${item.subject}`"
                    is-link
                    class="cell-text"
                    @click="stop"
                />
                <van-divider>到底了</van-divider>
            </van-skeleton>
        </van-pull-refresh>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            isRefreshing: false,
            isLoading: true
        };
    },
    mounted() {
        this.getNgaTopic()
    },
    methods: {
        getNgaTopic() {
            // cordova.plugin.http.setDataSerializer('json');
            window.cordova.plugin.http.get('https://bbs.nga.cn/thread.php?fid=706&page=1&lite=js&noprefix', {}, {
                'Cookie': 'UM_distinctid=17664778821131-04d67b56e867b9-163c6153-240000-17664778822a3f; taihe_bi_sdk_uid=50284181f2e237a8de208abcecaba239; taihe=5eadee95d484dc26019c789f7ad7c311; CNZZDATA30043604=cnzz_eid%3D1251479639-1608001405-https%253A%252F%252Fbbs.nga.cn%252F%26ntime%3D1616147293; _cnzz_CV30043604=forum%7Cfid706%7C0; taihe_bi_sdk_session=7faf829bd0e0dea84b085c6e0cfbf0cf; ngacn0comUserInfo=verygoodbye%09verygoodbye%0939%0939%09%0910%090%094%090%090%09; ngacn0comUserInfoCheck=d500fed477b2e0416f17c46fdfffd477; ngacn0comInfoCheckTime=1616383401; ngaPassportUid=62671744; ngaPassportUrlencodedUname=verygoodbye; ngaPassportCid=X948giosc9s0t6t9h6s900eo7m945tou5dtl85fr; bbsmisccookies=%7B%22pv_count_for_insad%22%3A%7B0%3A-42%2C1%3A1616432396%7D%2C%22insad_views%22%3A%7B0%3A1%2C1%3A1616432396%7D%2C%22uisetting%22%3A%7B0%3A%22a%22%2C1%3A1616403684%7D%7D; lastvisit=1616403572; lastpath=/thread.php?fid=706&page=1&lite=js&noprefix',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
            }, res => {
                if (res.status !== 200) {
                    console.log('获取数据失败');
                    this.$toast.fail('error');
                    return;
                }
                this.$toast.success('获取成功')

                const data = JSON.parse(res.data)
                this.list = data._T;
                this.isLoading = false
            }, err => {
                console.log(JSON.stringify(err));
                this.$toast.fail('获取数据失败')
                return
            });
        }
    },

};
</script>

<style scoped>
.login-container {
    height: 100%;
    padding: 0;
}
#nga-login {
    width: 100%;
    height: 100%;
}
</style>

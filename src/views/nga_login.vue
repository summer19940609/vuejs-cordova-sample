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
        this.getNgaTopic('706', '1')
    },
    methods: {
        getNgaTopic(fid, page) {
            window.cordova.plugin.http.setDataSerializer('json');
            window.cordova.plugin.http.post(`https://bbs.nga.cn/thread.php`, {
                'fid': fid,
                'page': page,
                'lite': 'js'
            }, {
                'Connection': 'keep-alive',
                'Host': 'bbs.nga.cn',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36',
                'Cookie': 'ngaPassportUid=62671744; ngaPassportCid=X948giosc9s0t6t9h6s900eo7m945tou5dtl85fr;'
            }, res => {
                console.log(JSON.stringify(res));
                if (res.status !== 200) {
                    console.log('获取数据失败');
                    this.$toast.fail('error');
                    return;
                }
                this.$toast.success('获取数据成功')

                const data = JSON.parse(res.data)
                console.log(data);
                let _t = data._T;
                this.list = Object.values(_t)
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

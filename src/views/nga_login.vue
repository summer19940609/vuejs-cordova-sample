<template>
    <v-container class="login-container">
        <van-form @submit="onSubmit">
            <van-field v-model="nga_cookie" name="nga_cookie" label="cookie" placeholder />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>

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

        <van-row>
            <van-col span="24" class="http-text">{{ text }}</van-col>
        </van-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            isRefreshing: false,
            isLoading: true,
            text: '',
            nga_cookie: ''
        };
    },
    mounted() {

    },
    methods: {
        async onSubmit(value) {
            this.nga_cookie = value.nga_cookie
            await this.getNgaTopic('706', '1')
        },
        getNgaTopic(fid, page) {
            return new Promise((resolve, reject) => {
                const params = {
                    'fid': fid,
                    'page': page,
                    '__output': '1'
                }
                const header = {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-CN,zh;q=0.9",
                    'Host': 'bbs.nga.cn',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36',
                    'Cookie': this.nga_cookie
                }
                console.log(`====> 请求header为: ${JSON.stringify(header)}`);

                window.cordova.plugin.http.post(`https://bbs.nga.cn/thread.php`, params, header, res => {
                    console.log(`====> res为: ${JSON.stringify(res)}`);

                    this.text = JSON.stringify(res)
                    if (res.status !== 200) {
                        console.log('获取数据失败');
                        this.$toast.fail('error');
                        resolve()
                    }
                    this.$toast.success('获取数据成功')
                    const data = JSON.parse(res.data)
                    this.list = Object.values(data)
                    // const data = res.data.window.script_muti_get_var_store
                    this.isLoading = false
                    resolve()
                }, err => {
                    console.log(`====> err为: ${JSON.stringify(err)}`);
                    this.text = JSON.stringify(err)
                    this.$toast.fail('获取数据失败')
                    reject()
                });
            })
        }
    },

};
</script>

<style scoped>
.login-container {
    height: 100%;
    padding: 20px 0 0 0;
}
.http-text {
    height: 50vh;
    overflow: auto;
}
</style>

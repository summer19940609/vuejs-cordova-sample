<template>
    <v-container class="login-container">
        <van-form @submit="onSubmit" v-show="!hasData">
            <van-field v-model="nga_cookie" name="nga_cookie" label="cookie" placeholder />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" offset='100'>
                <van-cell v-for="item in list" :key="item.tid" :title="item.subject" />
            </van-list>
        </van-pull-refresh>

    </v-container>
</template>

<script>
export default {
    data() {
        return {
            hasData: false,
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            page: 1,
            pageMax: 1,
            totalCount: 0,
            nga_cookie:
                'bbsmisccookies=%7B%22pv_count_for_insad%22%3A%7B0%3A-44%2C1%3A1616432476%7D%2C%22insad_views%22%3A%7B0%3A1%2C1%3A1616432476%7D%2C%22uisetting%22%3A%7B0%3A%22b%22%2C1%3A1616424785%7D%7D; lastpath=/thread.php?fid=706&rand=348; lastvisit=1616424485; ngaPassportCid=X94a566bs5dp95io9r4mmotk703fsbtv52nfdsma; ngaPassportUid=62671744; ngaPassportUrlencodedUname=verygoodbye; ngacn0comInfoCheckTime=1616424482; ngacn0comUserInfo=verygoodbye%09verygoodbye%0939%0939%09%0910%090%094%090%090%09; ngacn0comUserInfoCheck=a79af1523ef7db96cdff7873b19e2afa; ngaPassportOid=a33135eb553e3d68deddf326a01788eb; guestJs=1616424469; taihe_bi_sdk_session=8dd0ecb6ecded9d78a753bdc2a330f70; taihe_bi_sdk_uid=e35bdc61c6574f31e0d47e33cb1dccd0'
        }
    },
    mounted() {
        this.getNgaTopic('706', '1')
    },
    methods: {
        async onSubmit(value) {
            this.nga_cookie = value.nga_cookie
            await this.getNgaTopic('706', '1')
        },
        getNgaTopic(fid, page) {
            return new Promise((resolve, reject) => {
                const params = {
                    fid: fid,
                    page: page,
                    __output: '11'
                }
                const header = {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                    Host: 'bbs.nga.cn',
                    Connection: 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    Cookie: this.nga_cookie
                }
                console.log(`====> 请求header为: ${JSON.stringify(header)}`)

                const options = {
                    method: 'post',
                    data: params,
                    headers: header,
                    responseType: 'json',
                    timeout: 10
                }
                window.cordova.plugin.http.clearCookies()
                window.cordova.plugin.http.sendRequest(
                    `https://bbs.nga.cn/thread.php`,
                    options,
                    res => {
                        console.log(`====> res为: ${JSON.stringify(res)}`)
                        if (res.status !== 200) {
                            console.log('获取数据失败')
                            this.$toast.fail('error')
                            resolve()
                        }
                        this.hasData = true
                        const data = res.data
                        const list = data.data.__T

                        this.list = list
                        this.isLoading = false
                        this.totalCount = data.data.__ROWS
                        this.pageMax = Math.ceil(this.totalCount / data.data.__T.length)
                        resolve()
                    },
                    err => {
                        console.log(`====> err为: ${JSON.stringify(err)}`)
                        this.text = JSON.stringify(err)
                        this.$toast.fail('获取数据失败')
                        reject()
                    }
                )
            })
        },
        async loadMore() {

        },
        onRefresh() {
            // 清空列表数据
            this.finished = false

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true
            this.loadMore()
        }
    }
}
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

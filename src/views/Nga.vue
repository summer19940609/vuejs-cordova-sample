<template>
    <v-container class="login-container">
        <!-- <van-form @submit="onSubmit" v-show="!hasData">
            <van-field v-model="nga_cookie" name="nga_cookie" label="cookie" placeholder />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>-->

        <van-pull-refresh v-model="refreshing" success-text="刷新成功">
            <van-list v-model="loading" :finished="finished" @load="onLoad" offset="100">
                <div class="topic-item" v-for="( item ) in list" :key="item.tid" @click="go2detail(item.tpcurl)">
                    <div class="topic-title">{{`${item.subject}`}}</div>
                    <div class="img-group" v-if="item.img">
                        <img class="topic-img" :src="`https://img.nga.178.com/attachments/${pic}`" alt v-for="pic in item.img" :key="pic" />
                    </div>
                    <van-row class="topic-author-reply">
                        <van-col class="topic-author" span="20">{{ item.author }}</van-col>
                        <van-col class="topic-reply-num" span="4">{{ item.replies }}</van-col>
                    </van-row>
                </div>
            </van-list>
        </van-pull-refresh>
    </v-container>
</template>

<script>

export default {
    name: 'nga',
    data() {
        return {
            fid: '706',
            defaultPageSize: 36,
            hasData: false,
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            page: 1,
            pageMax: 1,
            total: 0,
            nga_cookie:
                'bbsmisccookies=%7B%22pv_count_for_insad%22%3A%7B0%3A-44%2C1%3A1616432476%7D%2C%22insad_views%22%3A%7B0%3A1%2C1%3A1616432476%7D%2C%22uisetting%22%3A%7B0%3A%22b%22%2C1%3A1616424785%7D%7D; lastpath=/thread.php?fid=706&rand=348; lastvisit=1616424485; ngaPassportCid=X94a566bs5dp95io9r4mmotk703fsbtv52nfdsma; ngaPassportUid=62671744; ngaPassportUrlencodedUname=verygoodbye; ngacn0comInfoCheckTime=1616424482; ngacn0comUserInfo=verygoodbye%09verygoodbye%0939%0939%09%0910%090%094%090%090%09; ngacn0comUserInfoCheck=a79af1523ef7db96cdff7873b19e2afa; ngaPassportOid=a33135eb553e3d68deddf326a01788eb; guestJs=1616424469; taihe_bi_sdk_session=8dd0ecb6ecded9d78a753bdc2a330f70; taihe_bi_sdk_uid=e35bdc61c6574f31e0d47e33cb1dccd0'
        }
    },
    created() {
        this.$store.commit('setTitle', '大时代')
    },
    async mounted() {
        const { list, total, err } = await this.handelTopic(this.fid, '1')
        if (err) {
            return
        }
        this.list = list
        this.total = total
        this.pageMax = Math.ceil(total / this.defaultPageSize)
    },
    methods: {
        async handelTopic(fid, page) {
            this.$store.commit('showLoading')
            const { list, total, err } = await this.getNgaTopic(fid, String(page))
            if (err) {
                this.$store.commit('hideLoading')
                return err
            }
            if (!list.length) {
                return
            }
            for (const v of list) {
                const { data, err } = await this.getReadDetail(String(v.tid), '1')
                if (err) {
                    // console.log(`====> err为: ${JSON.stringify(err)}`)
                }
                v['__T'] = data.__T // 主题详情
                const attachs = data.__T.post_misc_var.attachs
                if (attachs && Array.isArray(attachs)) {
                    v['img'] = attachs.map(k => k.attachurl)
                }
            }
            this.$store.commit('hideLoading')
            return { list, total, err }
        },
        getNgaTopic(fid, page) {
            return new Promise((resolve, reject) => {
                const params = {
                    fid: fid,
                    page: page,
                    __output: '11'
                }
                console.log(`==== params => ${JSON.stringify(params)}`)
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
                        if (res.status !== 200) {
                            this.$toast.fail('error')
                            reject({ list: null, total: null, err: 'error' })
                        }
                        let data = res.data

                        const _T = data.data.__T
                        let list = []
                        // 接口结构变化特殊处理
                        if (Array.isArray(_T)) {
                            list = _T
                        } else if (Object.prototype.toString.call(_T) === '[object Object]') {
                            list = Object.values(_T)
                        }

                        resolve({ list: list, total: data.data.__ROWS, err: null })
                    },
                    err => {
                        console.log(`====> [thread.php]的err为: ${JSON.stringify(err)}`)
                        this.$toast.fail('获取数据失败')
                        reject({ list: null, total: null, err: err })
                    }
                )
            })
        },
        getReadDetail(tid, page) {
            return new Promise((resolve, reject) => {
                const params = {
                    tid: tid,
                    v2: '1',
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

                const options = {
                    method: 'post',
                    data: params,
                    headers: header,
                    responseType: 'json',
                    timeout: 10
                }
                window.cordova.plugin.http.clearCookies()
                window.cordova.plugin.http.sendRequest(
                    `https://bbs.nga.cn/read.php`,
                    options,
                    res => {
                        if (res.status !== 200) {
                            this.$toast.fail('error')
                            reject({ data: null, err: 'error' })
                        }
                        const data = res.data.data
                        resolve({ data: data, err: null })
                    },
                    err => {
                        console.log(`====> [read.php]的err为: ${JSON.stringify(err)}`)
                        this.$toast.fail('获取数据失败')
                        reject({ data: null, err: err })
                    }
                )
            })
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true
            this.onLoad()
        },
        async onLoad() {
            if (this.refreshing) {
                this.list = []
                this.refreshing = false
            }
            const { list, total, err } = await this.handelTopic(this.fid, this.page + 1)
            if (err) {
                return
            }
            this.list = list
            this.total = total
            this.pageMax = Math.ceil(total / this.defaultPageSize)

            this.loading = false
        },
        go2detail(url) {
            window.open(`https://bbs.nga.cn${url}`, '_blank', 'location=yes')
        }
    }
}
</script>

<style scoped>
.login-container {
    height: 100%;
    padding: 20px 10px 10px 10px;
    background-color: #fbf9e8;
}
.http-text {
    height: 50vh;
    overflow: auto;
}
.topic-img {
    height: 50px;
}
.topic-title {
    font-size: 18px;
    color: #363742;
    padding-top: 10px;
}
.topic-item {
    border-bottom: 1px solid #e4e0cf;
}
.img-group {
    display: flex;
    align-content: center;
    flex-direction: row;
}
.img-group img {
    margin: 5px;
    height: 100px;
}
.topic-author-reply {
    font-size: 12px;
    color: rgb(145, 142, 142);
}
.topic-author {
    text-align: left;
}
.topic-reply-num {
    text-align: right;
}
</style>

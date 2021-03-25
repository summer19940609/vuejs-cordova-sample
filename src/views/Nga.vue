<template>
    <v-container class="login-container">

        <van-list v-model="loading" :finished="finished" @load="onLoad" offset="50">
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

    </v-container>
</template>

<script>

const ngaHeader = {
    'User-Agent':
        'Mozilla/5.0 (Macintosh Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
    Host: 'bbs.nga.cn',
    Connection: 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Accept-Language': 'zh-CN,zhq=0.9,enq=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    Accept:
        'text/html,application/xhtml+xml,application/xmlq=0.9,image/avif,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3q=0.9',
    Cookie: 'bbsmisccookies=%7B%22pv_count_for_insad%22%3A%7B0%3A-44%2C1%3A1616432476%7D%2C%22insad_views%22%3A%7B0%3A1%2C1%3A1616432476%7D%2C%22uisetting%22%3A%7B0%3A%22b%22%2C1%3A1616424785%7D%7D; lastpath=/thread.php?fid=706&rand=348; lastvisit=1616424485; ngaPassportCid=X94a566bs5dp95io9r4mmotk703fsbtv52nfdsma; ngaPassportUid=62671744; ngaPassportUrlencodedUname=verygoodbye; ngacn0comInfoCheckTime=1616424482; ngacn0comUserInfo=verygoodbye%09verygoodbye%0939%0939%09%0910%090%094%090%090%09; ngacn0comUserInfoCheck=a79af1523ef7db96cdff7873b19e2afa; ngaPassportOid=a33135eb553e3d68deddf326a01788eb; guestJs=1616424469; taihe_bi_sdk_session=8dd0ecb6ecded9d78a753bdc2a330f70; taihe_bi_sdk_uid=e35bdc61c6574f31e0d47e33cb1dccd0',
};

export default {
    name: 'nga',
    data() {
        return {
            fid: '706',
            pageSize: 36,
            list: [],
            loading: false,
            finished: false,
            page: 1,
            totalPage: 1,
            total: 1
        };
    },
    created() {
        this.$store.commit('setTitle', '大时代');
    },
    mounted() {
        this.fetchTopic();
    },
    methods: {
        fetchTopic() {
            // this.$store.commit('showLoading')
            this.loading = true;
            this.handelTopic(this.fid, this.page).then((data) => {
                // this.$store.commit('hideLoading')
                this.loading = false;
                this.list = this.list.concat(data.list);
                this.total = data.total;
                this.totalPage = Math.ceil(data.total / this.pageSize);
            });
        },
        async handelTopic(fid, page) {
            const { list, total } = await this.getNgaTopic( fid, String(page));
            if (!list.length) {
                return Promise.resolve({ list: [], total: 0 });
            }
            for (const v of list) {
                const data = await this.getReadDetail( String(v.tid), '1');
                v['__T'] = data.__T; // 主题详情
                const attachs = data.__T.post_misc_var.attachs;
                if (attachs && Array.isArray(attachs)) {
                    v['img'] = attachs.map((k) => k.attachurl);
                }
            }
            return Promise.resolve({ list, total });
        },
        getNgaTopic(fid, page) {
            return new Promise((resolve, reject) => {
                const params = {
                    fid: fid,
                    page: page,
                    __output: '11',
                };
                console.log(`==== params => ${JSON.stringify(params)}`);
                const options = {
                    method: 'post',
                    data: params,
                    headers: ngaHeader,
                    responseType: 'json',
                    timeout: 10,
                };
                this.$nativeHttp.post('https://bbs.nga.cn/thread.php', options).then(res => {
                    const _T = res.data.__T;
                    console.log(`====> [_T] => ${JSON.stringify(_T)}`)
                    let list = [];
                    if (Array.isArray(_T)) {
                        list = _T;
                    } else if ( Object.prototype.toString.call(_T) === '[object Object]' ) {
                        list = Object.values(_T);
                    }
                    resolve({ list: list, total: res.data.__ROWS });
                }, err => {
                    reject(err)
                });
            });
        },
        getReadDetail(tid, page) {
            return new Promise((resolve, reject) => {
                const params = {
                    tid: tid,
                    v2: '1',
                    page: page,
                    __output: '11',
                };

                const options = {
                    method: 'post',
                    data: params,
                    headers: ngaHeader,
                    responseType: 'json',
                    timeout: 10,
                };
                this.$nativeHttp.post(`https://bbs.nga.cn/read.php`, options).then(res => {
                    resolve(res.data);
                }, err => {
                    reject(err)
                });
            });
        },
        onRefresh() {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        go2detail(url) {
            window.open(`https://bbs.nga.cn${url}`, '_blank', 'location=yes');
        },
        onLoad() {
            if (this.pageSize < this.totalPage) {
                this.page++;
                this.fetchTopic();
            } else {
                this.finished = true;
            }
        },
        destroy() {
            if (this.$store.state.LOADING) {
                this.$store.commit('hideLoading');
            }
        },
    },
};
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
    content-visibility: auto;
    contain-intrinsic-size: 50px;
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

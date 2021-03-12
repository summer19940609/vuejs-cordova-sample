<template>
    <v-container text-center class="fund-container">
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
            class="refresh-box"
        >
            <div class="fund-index-box">
                <van-row
                    v-for="fundIndex in fundIndexList"
                    :key="fundIndex.f12"
                >
                    <van-col span="6">{{ fundIndex.f14 }}</van-col>
                    <van-col span="6">{{ fundIndex.f2 }}</van-col>
                    <van-col
                        span="6"
                        :class="fundIndex.f4 > 0 ? 'text-red' : 'text-green'"
                        >{{ fundIndex.f4 }}</van-col
                    >
                    <van-col
                        span="6"
                        :class="fundIndex.f3 > 0 ? 'text-red' : 'text-green'"
                        >{{ fundIndex.f3 }}%</van-col
                    >
                </van-row>
            </div>
            <van-skeleton animate :row="9" :loading="skeletonLoading" style="margin-top: 20px;">
                <div class="fund-detail-box">
                    <div
                        class="fund-detail-item"
                        v-for="fund in fundList"
                        :key="fund.code"
                    >
                        <van-row>
                            <van-col span="20" style="text-align: left"
                                >{{ fund.SHORTNAME }} {{ fund.code }}
                            </van-col>
                            <van-col span="4" style="text-align: right">bb</van-col>
                        </van-row>
                        <van-row>
                            <van-col span="8" class="fund-detail-fs">
                                <span>份数/金额</span>
                                <span>{{ fund.num }}</span>
                                <span>{{ fund.CYJE }}</span>
                            </van-col>
                            <van-col span="8" class="fund-detail-cy">
                                <span>持有收益</span>
                                <span></span>
                                <span></span>
                            </van-col>
                            <van-col span="8" class="fund-detail-gj">
                                <span>估计收益</span>
                                <span :class="fund.GSZZL > 0 ? 'text-red' : 'text-green'">{{ fund.GSZZL }}%</span>
                                <span :class="fund.GSZZL > 0 ? 'text-red' : 'text-green'">{{ fund.GSSY }}</span>
                            </van-col>
                        </van-row>
                    </div>
                </div>
                <van-divider>到底啦</van-divider>
            </van-skeleton>
        </van-pull-refresh>
    </v-container>
</template>

<script>
export default {
    name: 'fund',
    data() {
        return {
            isLoading: false,
            fundList: [],       // 页面个人基金展示信息
            fundIndexList: [],      // 大盘指数
            skeletonLoading: true,      // 控制骨架屏显示
        };
    },
    mounted() {
        this.getFundIndexData();
        this.initData();
    },
    methods: {
        openMenu: () => {
            document.dispatchEvent(new CustomEvent('toggleDrawer', {}));
        },
        // 下拉刷新
        onRefresh() {
            this.getFundIndexData();
            this.initData();
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        // 整合数据，展示
        async initData(){
            let x2rrFundList = null;
            let fundConfig = localStorage.getItem('fundConfig')
            if (fundConfig && JSON.parse(fundConfig)) {
                x2rrFundList= JSON.parse(fundConfig);
            } else {
                x2rrFundList = await this.getX2rrFundsData('verygoodbye', 'xnj19940609')
            }
            console.log('====> x2rrFundList的值为: ', x2rrFundList);
            const fundCodeList = x2rrFundList.map(v => v.code);
            const fundInfoList = await this.getFundInfo(fundCodeList);
            x2rrFundList = x2rrFundList.map((v) => {
                const fund = fundInfoList.find((k) => k['FCODE'] == v.code);
                v = { ...v, ...fund };
                v['CYJE'] = (v.num * v.NAV).toFixed(2);     // 持有金额
                v['GSSY'] = (v.CYJE * v.GSZZL /100).toFixed(2);     // 估算收益
                return v
            });
            this.fundList = x2rrFundList
            this.skeletonLoading = false
        },
        // 同步浏览器接口数据
        getX2rrFundsData( username, password) {
            return new Promise((resolve, reject) => {
                this.$axios
                .post(
                    'https://2955b122-0e37-42a7-a4ee-4ddd503fe6b6.bspapp.com/http/user-center',
                    {
                        action: 'login',
                        params: {
                            username: username,
                            password: password,
                        },
                    },
                )
                .then((data) => {
                    console.log('====> 获取x2rr备份的个人基金数据的值为: ', data);
                    const fundConfig = JSON.parse(data.data.userInfo.config_data);
                    const fundList = fundConfig.fundListM;
                    localStorage.setItem('fundConfig', JSON.stringify(fundConfig))
                    resolve(fundList)
                })
                .catch((err) => {
                    console.log('====> err的值为: ', err);
                    reject(err)
                });
            })
        },
        // 获取指数
        getFundIndexData() {
            this.$axios
                .get(
                    'https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f2,f3,f4,f12,f13,f14&secids=1.000001,1.000300,0.399001,0.399006&_=1615516863425',
                )
                .then((data) => {
                    const fundIndexList = data.data.data.diff;
                    this.fundIndexList = fundIndexList;
                })
                .catch((err) => {
                    console.log('====> err的值为: ', err);
                });
        },
        // 获取基金信息
        getFundInfo(fundCodeList) {
            return new Promise((resolve, reject) => {
                const url = `https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo?pageIndex=1&pageSize=200&plat=Android&appType=ttjj&product=EFund&Version=1&deviceid=c6a12d28-1e46-46df-bd62-d543d600b464&Fcodes=${fundCodeList.join(',')}`;
                this.$axios
                    .get(url)
                    .then((data) => {
                        console.log('====> 获取基金信息接口返回的值为: ', data);
                        const fundInfoList = data.data.Datas || [];
                        resolve(fundInfoList);
                    })
                    .catch((err) => {
                        console.log('====> err的值为: ', err);
                        reject(err);
                    });
            });
        }
    },
};
</script>

<style scoped>
.fund-container {
    height: 100%;;
}
.refresh-box {
    -webkit-overflow-scrolling: touch;
}
.fund-index-box {
    font-size: 16px;
    background-color: #dde1ea;
    padding: 10px;
}
.fund-detail-box {
    margin-top: 20px;
}
.fund-detail-item {
    background-color: #e0e0e0;
    border: 10px solid #e0e0e0;
    padding: 10px;
    margin: 0 0 10px 0;
}
.fund-detail-fs {
    text-align: left;
    display: flex;
    flex-direction: column;
}
.fund-detail-cy {
    text-align: right;
    display: flex;
    flex-direction: column;
}
.fund-detail-gj {
    text-align: right;
    display: flex;
    flex-direction: column;
}
.text-green {
    color: green;
}
.text-red {
    color: red;
}
.van-skeleton {
    padding: 0;
}
.van-skeleton__row {
    height: 50px;
}
</style>

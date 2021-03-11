<template>
    <v-container text-center class="fund-container">
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
            class="refresh-box"
        >
            <div class="fund-index-box">
                <van-row>
                    <van-col span="6">上证指数</van-col>
                    <van-col span="6">3436.83</van-col>
                    <van-col span="6">79.09</van-col>
                    <van-col span="6">2.36%</van-col>
                </van-row>
                <van-row>
                    <van-col span="6">上证指数</van-col>
                    <van-col span="6">3436.83</van-col>
                    <van-col span="6">79.09</van-col>
                    <van-col span="6">2.36%</van-col>
                </van-row>
                <van-row>
                    <van-col span="6">上证指数</van-col>
                    <van-col span="6">3436.83</van-col>
                    <van-col span="6">79.09</van-col>
                    <van-col span="6">2.36%</van-col>
                </van-row>
                <van-row>
                    <van-col span="6">上证指数</van-col>
                    <van-col span="6">3436.83</van-col>
                    <van-col span="6">79.09</van-col>
                    <van-col span="6">2.36%</van-col>
                </van-row>
            </div>
            <div class="fund-detail-box">
                <div class="fund-detail-item">
                    <van-row>
                        <van-col span="20" style="text-align: left"
                            >招行中证白酒指数分级</van-col
                        >
                        <van-col span="4" style="text-align: right"
                            >03-11</van-col
                        >
                    </van-row>
                    <van-row>
                        <van-col span="8" class="fund-detail-fs">
                            <span>份数/金额</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-cy">
                            <span>持有收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-gj">
                            <span>估计收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                    </van-row>
                </div>
                <div class="fund-detail-item">
                    <van-row>
                        <van-col span="20" style="text-align: left"
                            >招行中证白酒指数分级</van-col
                        >
                        <van-col span="4" style="text-align: right"
                            >03-11</van-col
                        >
                    </van-row>
                    <van-row>
                        <van-col span="8" class="fund-detail-fs">
                            <span>份数/金额</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-cy">
                            <span>持有收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-gj">
                            <span>估计收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                    </van-row>
                </div>
                <div class="fund-detail-item">
                    <van-row>
                        <van-col span="20" style="text-align: left"
                            >招行中证白酒指数分级</van-col
                        >
                        <van-col span="4" style="text-align: right"
                            >03-11</van-col
                        >
                    </van-row>
                    <van-row>
                        <van-col span="8" class="fund-detail-fs">
                            <span>份数/金额</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-cy">
                            <span>持有收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-gj">
                            <span>估计收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                    </van-row>
                </div>
                <div class="fund-detail-item">
                    <van-row>
                        <van-col span="20" style="text-align: left"
                            >招行中证白酒指数分级</van-col
                        >
                        <van-col span="4" style="text-align: right"
                            >03-11</van-col
                        >
                    </van-row>
                    <van-row>
                        <van-col span="8" class="fund-detail-fs">
                            <span>份数/金额</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-cy">
                            <span>持有收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-gj">
                            <span>估计收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                    </van-row>
                </div>
                <div class="fund-detail-item">
                    <van-row>
                        <van-col span="20" style="text-align: left"
                            >招行中证白酒指数分级</van-col
                        >
                        <van-col span="4" style="text-align: right"
                            >03-11</van-col
                        >
                    </van-row>
                    <van-row>
                        <van-col span="8" class="fund-detail-fs">
                            <span>份数/金额</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-cy">
                            <span>持有收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                        <van-col span="8" class="fund-detail-gj">
                            <span>估计收益</span>
                            <span>11925.51</span>
                            <span>11925.51</span>
                        </van-col>
                    </van-row>
                </div>
            </div>
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

        },
        openMenu: () => {
            document.dispatchEvent(new CustomEvent('toggleDrawer', {}));
        },
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        // 同步浏览器接口数据

    },
};
</script>

<style scoped>
.refresh-box {
    -webkit-overflow-scrolling: touch
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
</style>

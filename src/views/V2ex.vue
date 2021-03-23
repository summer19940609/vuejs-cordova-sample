<template>
    <v-container>
        <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh" success-text="刷新成功">
            <van-skeleton :row="3" :loading="isLoading">
                <van-cell
                    v-show="!isLoading"
                    v-for="(item,index) in list"
                    :key="item.id"
                    :value="`${index+1}.${item.title}`"
                    is-link
                    class="cell-text"
                    @click="jump2V2ex(item.url)"
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
    created() {
        this.$store.commit('setTitle', 'V2EX')
    },
    mounted() {
        this.getV2exHot();
    },
    methods: {
        onRefresh() {
            this.getV2exHot();
            setTimeout(() => {
                this.isRefreshing = false;
            }, 1000);
        },
        getV2exHot() {
            // this.$axios
            //     .get('https://api.mrcuriosity.org/sites/v2ex/items')
            //     .then(res => {
            //         console.log('====> res的值为: ', res);
            //         if (res.status !== 200) {
            //             this.$toast.fail('error');
            //             return;
            //         }
            //         this.list = res.data;
            //         this.isLoading = false
            //     })
            //     .catch(err => {
            //         this.$toast.fail(err);
            //         console.log('====> err的值为: ', err);
            //     });
            cordova.plugin.http.setDataSerializer('json');
            window.cordova.plugin.http.get('https://api.mrcuriosity.org/sites/v2ex/items', {}, {},
                res => {
                    if (res.status !== 200) {
                        console.log('获取数据失败');
                        this.$toast.fail('获取数据失败');
                    }
                    this.$toast.success('获取数据成功')
                    this.list = JSON.parse(res.data);
                    this.isLoading = false
                }, err => {
                    console.log(JSON.stringify(err));
                    this.$toast.fail(err);
                });
        },
        jump2V2ex(url) {
            window.open(url, '_blank', 'location=yes');
        }
    },
};
</script>

<style scoped>
.cell-text {
    font-size: 16px;
}
.van-skeleton__row {
    background-color: white;
}
.van-skeleton {
    padding: 0;
}
</style>

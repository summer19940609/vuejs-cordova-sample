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
            this.$axios
                .get('http://bbs.nga.cn/thread.php?fid=706&page=1&lite=js&noprefix', {
                    headers: {
                        Cookie: "ngaPassportCid=X948giosc9s0t6t9h6s900eo7m945tou5dtl85fr; ngaPassportUid=62671744;"
                    },
                    withCredentials: true
                })
                .then(res => {
                    console.log('====> thread.php的值为: ', res);
                    if (res.status !== 200) {
                        this.$toast.fail('error');
                        return;
                    }
                    this.list = res.data;
                    this.isLoading = false
                })
                .catch(err => {
                    this.$toast.fail(err);
                    console.log('====> err的值为: ', JSON.stringify(err));
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

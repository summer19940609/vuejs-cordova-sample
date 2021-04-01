<template>
    <v-container class="login-container">
        <svg t="1617258487629" class="fund-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2579" width="200" height="200"><path d="M697.33 267.83c5.84-11.156 8.632-18.39 8.632-22.19-1.904-14.836-10.535-23.05-25.768-24.89-15.359 0-26.783 6.498-34.4 19.372L513.782 431.263 381.768 240c-7.616-12.873-19.168-19.371-34.4-19.371-15.36 1.839-23.864 10.176-25.768 24.889 1.904 7.478 4.697 14.835 8.632 22.191 1.904 1.84 2.92 3.678 2.92 5.517l117.669 174.59h-68.927c-21.07 0-31.607 8.337-31.607 24.889 1.904 12.996 12.44 20.352 31.607 22.192h100.407v49.777H381.894c-21.07 0-31.607 8.337-31.607 24.889 1.904 12.874 12.44 20.352 31.607 22.191h100.407V702.59c0 18.39 10.409 27.708 31.607 27.708 20.944 0 31.48-9.318 31.48-27.708v-110.59h100.407c19.04-1.84 29.576-9.318 31.607-22.192 0-16.674-10.536-24.889-31.607-24.889H545.388v-49.777h100.407c19.04-1.84 29.576-9.196 31.607-22.192 0-16.674-10.536-24.889-31.607-24.889h-68.8l117.67-174.59c-0.127-1.961 0.762-3.8 2.666-5.64zM908.173 613.7l-74.258 7.724c-7.87 0.735-14.725 5.64-17.898 12.628-3.173 6.866-2.285 15.08 2.285 21.21l7.362 9.687L500.2 899.125 412.74 794.052c-8.885-10.667-25.133-12.751-36.558-4.536-36.684 26.36-91.14 65.103-100.025 70.62-11.424 5.763-17.01 18.759-12.82 30.897 4.696 13.486 19.674 20.597 33.637 16.184 4.57-1.472 7.743-2.575 90.379-61.793l87.459 105.072c5.204 6.253 12.947 9.563 20.69 9.563 5.459 0 11.044-1.594 15.867-5.15l345.774-248.642 5.331 7.11c4.19 5.518 10.917 8.706 17.899 8.706 0.761 0 1.523 0 2.284-0.123 7.87-0.858 14.725-5.64 18.025-12.628l30.211-66.084c3.047-6.989 2.285-15.08-2.412-21.334-4.696-5.762-12.44-9.072-20.31-8.214zM513.782 65.287c-246.765 0-447.45 193.839-447.45 432.183 0 115.372 46.585 223.877 130.997 305.532 5.205 5.027 11.932 7.479 18.787 7.479a27.345 27.345 0 0 0 18.786-7.479c10.41-10.053 10.41-26.237 0-36.291-74.511-71.847-115.511-167.601-115.511-269.24 0-210.023 176.822-380.812 394.263-380.812S907.918 287.448 907.918 497.47c0 14.222 11.932 25.625 26.656 25.625 14.725 0 26.53-11.525 26.53-25.625 0-238.344-200.686-432.183-447.323-432.183z" fill="#1296db" p-id="2580"></path></svg>
        <van-form @submit="onSubmit" class="login-form">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" />
            <div style="margin: 16px 0;">
                <van-button block :loading="loading" :disabled="loading" type="info" loading-text="加载中..." native-type="submit">提交</van-button>
            </div>
        </van-form>
    </v-container>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            loading: false
        };
    },
    created() {
        this.$store.commit('setTitle', '基金同步')
    },
    mounted() {

    },
    methods: {
        async onSubmit({ username, password }) {
            this.loading = true
            const { err } = await this.getX2rrFundsData(username, password)
            if (err) {
                this.$toast.fail(err)
                this.loading = false
                return
            }
            this.$toast.success('同步成功')
            this.loading = false
            this.$router.push('/fund')
        },
        getX2rrFundsData(username, password) {
            return new Promise((resovle, reject) => {
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
                    .then((res) => {
                        console.log('====> 获取x2rr备份的个人基金数据的值为: ', res);
                        if (res.data.code != 0) {
                            resovle({ 'err': res.data.message, 'data': null })
                        }
                        const fundConfig = JSON.parse(res.data.userInfo.config_data)
                        const fundList = fundConfig.fundListM;
                        localStorage.setItem('x2rrFundList', JSON.stringify(fundList))
                        resovle({ 'err': null, 'data': fundList })
                    })
                    .catch((err) => {
                        console.log('====> err的值为: ', err)
                        reject({ 'err': err, 'data': null })
                    });
            })
        },
    },
};
</script>

<style scoped>
.login-container {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login-form {
    width: 100%;
    margin-top: 10px;
}
.fund-icon {
    width: 150px;
    height: 150px;
}
</style>

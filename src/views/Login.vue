<template>
    <v-container class="login-container">
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
            />
            <div style="margin: 16px;">
                <van-button
                    round
                    block
                    :loading="loading"
                    :disabled="loading"
                    type="info"
                    loading-text="加载中..."
                    native-type="submit"
                >提交</van-button>
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
    mounted() {

    },
    methods: {
        async onSubmit({ username, password }) {
            this.loading = true
            const { err, data } = await this.getX2rrFundsData(username, password)
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
    background-color: #f0f2f5;
    height: 100%;
    padding: 20px 0 0 0;
}
</style>

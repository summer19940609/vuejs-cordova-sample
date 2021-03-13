<template>
    <v-container class="login-container">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="浏览器插件使用的用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="浏览器插件使用的密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </v-container>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    mounted() {

    },
    methods: {
        onSubmit({ username, password }) {
            console.log('====> submit的值为: ');
            this.getX2rrFundsData(username, password)
        },
        getX2rrFundsData(username, password) {
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
                        localStorage.setItem('x2rrFundList', JSON.stringify(fundList))
                        Toast.success('同步成功');
                    })
                    .catch((err) => {
                        Toast.fail(err);
                        console.log('====> err的值为: ', err);
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
}
</style>

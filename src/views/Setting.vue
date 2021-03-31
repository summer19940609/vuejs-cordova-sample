<template>
    <v-container center>
        <van-form @submit="onSubmit" v-show="formShow">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>

        <div class="auth-code-box" v-show="codeShow">
            <img :src="codePic" alt="" />
            <van-cell-group>
                <van-field v-model="authCode" label="验证码" placeholder="请输入验证码" />
            </van-cell-group>
            <van-button type="info" block @click="login">登录</van-button>
        </div>
    </v-container>
</template>

<script>
import dayjs from 'dayjs'
import CRC32 from 'crc32'
import md5 from 'md5'
export default {
    name: 'setting',
    data() {
        return {
            username: '',
            password: '',
            authCode: '',
            authCodeCookie: '',
            codePic: '',
            codeShow: false,
            formShow: true
        }
    },
    mounted() {
        // this.loadAuthCode()
    },
    methods: {
        onSubmit({ username, password }) {
            this.formShow = false
            this.codeShow = true
            this.loadAuthCode()
        },
        // ngaLogin() {
        //     const ngaHeader = {
        //         'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36 AndroidNGAOS/',
        //         Host: 'bbs.nga.cn',
        //         Connection: 'keep-alive',
        //         'Cache-Control': 'max-age=0',
        //         'Accept-Language': 'zh-CN,zhq=0.9,enq=0.8',
        //         'Accept-Encoding': 'gzip, deflate, br',
        //         Accept: 'text/html,application/xhtml+xml,application/xmlq=0.9,image/avif,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3q=0.9'
        //     }
        //     const params = {
        //         __lib: 'login',
        //         __act: 'login',
        //         name: 'verygoodbye',
        //         password: 'xnj19940609',
        //         type: 'id',
        //         __output: '11',
        //         __inchst: 'GBK',
        //         __ngaClientChecksum: this.getNgaClientChecksum()
        //     }
        //     const options = {
        //         method: 'post',
        //         data: params,
        //         headers: ngaHeader,
        //         responseType: 'json',
        //         timeout: 10
        //     }
        //     console.log(`====> params => ${JSON.stringify(params)}`)
        //     this.$nativeHttp.post('https://bbs.nga.cn/nuke.php', options).then(
        //         () => {},
        //         () => {}
        //     )
        // },
        getNgaClientChecksum() {
            const secret = '3ebd769858c56bd345898154e4b44427'
            const currTime = dayjs().unix()
            const crc32 = CRC32('xnj19940609')
            const str = `${crc32}${secret}${currTime}`
            const ngaClientChecksum = `${md5(str)}${currTime}`
            return ngaClientChecksum
        },
        loadAuthCode() {
            const authCookie = '_' + Math.random()
            this.authCodeCookie = authCookie
            const url = `https://bbs.nga.cn/login_check_code.php?id=${authCookie}`
            const options = {
                method: 'get',
                responseType: 'blob',
                headers: {
                    Referer: 'https://bbs.nga.cn/nuke/account_copy.html?login'
                }
            }
            this.$nativeHttp.curl(url, options).then(
                data => {
                    this.blobToBase64(data).then(res => {
                        this.codePic = res
                    })
                },
                err => {}
            )
        },
        login() {
            const params = {
                name: this.username,
                type: 'name',
                password: this.password,
                rid: this.authCodeCookie,
                captcha: this.authCode.toUpperCase(),
                __lib: 'login',
                __act: 'login',
                __output: 11,
                __inchst: 'UTF-8',
                raw: 3,
                qrkey: ''
            }
            console.log(`==== [params] => ${JSON.stringify(params)}`)
            this.$nativeHttp.setDataSerializer('multipart')
            const formData = this.$nativeHttp.createFormData(params)
            const loginOptions = {
                method: 'post',
                data: formData,
                responseType: 'json',
                headers: {
                    Referer: 'https://bbs.nga.cn/nuke/account_copy.html?login',
                    'Content-Type': 'multipart/form-data;'
                }
            }
            this.$nativeHttp.curl(`https://bbs.nga.cn/nuke.php`, loginOptions).then(
                res => {
                    const data = res.data
                    if (data[0] === '登录成功') {
                        const ngaPassportUid = data[1]
                        const ngaPassportCid = data[2]
                        const cookie = {
                            ngaPassportUid,
                            ngaPassportCid
                        }
                        const userInfo = data[3]
                        localStorage.setItem('ngaCookie', JSON.stringify(cookie))
                        localStorage.setItem('userInfo', JSON.stringify(userInfo))
                        this.$toast.success('登录成功')
                    }
                },
                err => {
                    this.$toast.fail(JSON.stringify(err))
                }
            )
        },
        // blob => base64
        blobToBase64(blob) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader()
                fileReader.onload = e => {
                    resolve(e.target.result)
                }
                // readAsDataURL
                fileReader.readAsDataURL(blob)
                fileReader.onerror = () => {
                    reject(new Error('blobToBase64 error'))
                }
            })
        }
    }
}
</script>

<style scoped>
.auth-code-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}
</style>

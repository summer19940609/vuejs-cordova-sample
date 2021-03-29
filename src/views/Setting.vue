<template>
    <v-container>
        <img :src="codePic" alt="无法显示">
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
            codePic: ''
        }
    },
    mounted() {
        console.log('enter setting')
        this.loadAuthCode()
        this.ngaLogin()
    },
    methods: {
        ngaLogin() {
            const ngaHeader = {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36 AndroidNGAOS/',
                Host: 'bbs.nga.cn',
                Connection: 'keep-alive',
                'Cache-Control': 'max-age=0',
                'Accept-Language': 'zh-CN,zhq=0.9,enq=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                Accept:
                    'text/html,application/xhtml+xml,application/xmlq=0.9,image/avif,image/webp,image/apng,*/*q=0.8,application/signed-exchangev=b3q=0.9'
            }
            const params = {
                __lib: 'login',
                __act: 'login',
                name: 'verygoodbye',
                password: 'xnj19940609',
                type: 'id',
                __output: '11',
                __inchst: 'GBK',
                __ngaClientChecksum: this.getNgaClientChecksum()
            }
            const options = {
                method: 'post',
                data: params,
                headers: ngaHeader,
                responseType: 'json',
                timeout: 10
            }
            console.log(`====> params => ${JSON.stringify(params)}`)
            this.$nativeHttp.post('https://bbs.nga.cn/nuke.php', options).then(
                res => {},
                err => {}
            )
        },
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
            const url = `https://bbs.ngacn.cc/login_check_code.php?id=${authCookie}/`
            console.log("🚀 ~ file: Setting.vue ~ line 70 ~ loadAuthCode ~ url", url)
            this.codePic = url
        }
    }
}
</script>

<style scoped></style>

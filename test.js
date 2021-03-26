const axios = require('axios')
const CRC32 = require('crc32')
const md5 = require('md5')
const dayjs = require('dayjs')

// 测试nga登录接口
axios({
    method: 'post',
    responseType: 'json',
    url: 'https://bbs.nga.cn/nuke.php',
    params: {
        '__lib': 'login',
        '__act': 'login',
        'name': 'verygoodbye',
        'password': 'xnj19940609',
        'type': 'id',
        '__output': '11',
        '__inchst': 'GBK',
        '__ngaClientChecksum': getNgaClientChecksum('xnj19940609'),
    }
}).then(res => {
    console.log('====> res.data: ', res.data);
}).catch(err => {
    console.log('====> err的值为: ', JSON.stringify(err))
})

function getNgaClientChecksum(password) {
    const secret = '3ebd769858c56bd345898154e4b44427'
    const currTime = dayjs().unix()
    const crc32 = CRC32(password)
    const str = `${crc32}${secret}${currTime}`
    const ngaClientChecksum = `${md5(str)}${currTime}`
    return ngaClientChecksum
}

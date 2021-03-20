const axios = require('axios')
axios
    .get('http://bbs.nga.cn/thread.php?fid=706&page=1&lite=js&noprefix', {
        headers: {
            Cookie: 'ngaPassportCid=X948giosc9s0t6t9h6s900eo7m945tou5dtl85fr; ngaPassportUid=62671744;'
        },
        withCredentials: true
    })
    .then(res => {
        const data = res.data
        console.log('====> data的值为: ', data);
    })
    .catch(err => {
        console.log('====> err的值为: ', JSON.stringify(err))
    })

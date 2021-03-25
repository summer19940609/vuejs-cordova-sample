export class NativeHttp {

    post(url, options) {
        return new Promise((resolve, reject) => {
            window.cordova.plugin.http.clearCookies()
            window.cordova.plugin.http.sendRequest(url, options, (res) => {
                console.log(`====> [${url}的res.data为] => ${JSON.stringify(res.data)}`)
                resolve(res.data)
            }, (err) => {
                console.log(`====> [${url}的err为] => ${JSON.stringify(err)}`)
                reject(err)
            })
        })
    }

}

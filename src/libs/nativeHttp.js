export class NativeHttp {

    curl(url, options) {
        return new Promise((resolve, reject) => {
            // window.cordova.plugin.http.clearCookies()
            window.cordova.plugin.http.sendRequest(url, options, (res) => {
                console.log(`====> [${url}的res.data为] => ${JSON.stringify(res.data)}`)
                resolve(res.data)
            }, (err) => {
                console.log(`====> [${url}的err为] => ${JSON.stringify(err)}`)
                reject(err)
            })
        })
    }

    setDataSerializer(string) {
        window.cordova.plugin.http.setDataSerializer(string)
    }

    createFormData(data) {
        const formData = new window.cordova.plugin.http.ponyfills.FormData()
        for (const key in data) {
            const value = data[key]
            formData.append(key, value)
        }
        return formData
    }
}

module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'fr',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080, // 端口
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://bbs.nga.cn',  // 代理的接口域名以及端口号；
                ws: true,   // 支持ws协议；websocket的缩写；
                changeOrigin: true,// 是否跨域
                pathRewrite: {     // 路径替换
                    '^/api': ''
                }
            }
        }
    },
    publicPath: '',
    outputDir: 'cordova_app/www',
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,
    configureWebpack: {
        'performance': {
            hints: false
        }
    }
}

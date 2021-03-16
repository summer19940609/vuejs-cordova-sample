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
        port: 8808,
        publicPath: '/'
        // proxy: {
        //     '/proxy/*': {
        //         target: 'http://bbs.ngacn.cc/thread.php?fid=-7&page=1&lite=js',
        //         pathRewrite: { '^/proxy/(.*)$': '' },
        //         changeOrigin: true,
        //         secure: false
        //     }
        // }
    },
    publicPath: '',
    outputDir: 'cordova_app/www',
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined
}

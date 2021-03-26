const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
    lintOnSave: false,
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
    configureWebpack: {
        performance: {
            hints: false
        },
        plugins: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    // chainWebpack: config => {
    //     config.module
    //         .rule('css')
    //         .test(/\.css$/)
    //         .oneOf('vue')
    //         .resourceQuery(/\?vue/)
    //         .use('px2rem')
    //         .loader('px2rem-loader')
    //         .options({
    //             remUnit: 75
    //         })
    // }
}

// 打包去掉console.log
// if (process.env.NODE_ENV === 'production') {
//     config.configureWebpack.plugins = [
//         new UglifyJsPlugin({
//             uglifyOptions: {
//                 compress: {
//                     drop_console: true,
//                 },
//             },
//         }),
//     ]
// }

module.exports = config

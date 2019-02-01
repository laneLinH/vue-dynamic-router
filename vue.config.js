const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const proxy={
    '/cad': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
    }
}
module.exports = {
    // publicPath: '/', // 默认'/'，部署应用包时的基本 URL
    outputDir: process.env.outputDir || 'dist',
    assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true,
    productionSourceMap: false,

    configureWebpack: config => {
        // config.resolve = {
        //     extensions: ['.js', '.vue', '.json',".css",'.scss'],
        //     alias: {
        //         'vue$': 'vue/dist/vue.esm.js',
        //         '@': resolve('src'),
        //     }
        // }
        if (IS_PROD) {
            const plugins = [];
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }
        // config.externals = {
        //     'vue': 'Vue',
        //     'element-ui': 'ELEMENT',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'axios': 'axios'
        // }
    },
    chainWebpack: config => {
        config.resolve.symlinks(true);// 修复HMR
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static',
                }]);
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8082,
        proxy:proxy,
    },
    productionSourceMap: false,
        css: {
        extract: IS_PROD, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps
        // css预设器配置项
        loaderOptions: {
            sass:{
                data:`@import "@/assets/style/variables.scss";@import "@/assets/style/minxin.scss";$src: "${process.env.VUE_APP_SRC}";`,//将sass变量设置为全局
            }
        },
        modules: false

    },
}

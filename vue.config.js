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
    outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map

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
                            pure_funcs: ['console.log']//移除console
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
        // 修复HMR
        config.resolve.symlinks(true);
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static',
                }]);
        }
    },
    devServer: {
        // 设置主机地址
        host: '0.0.0.0',
        // 设置默认端口
        port: 8082,
        proxy:proxy,
    },
    productionSourceMap: false,
        css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: IS_PROD,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass:{
                data:`@import "@/assets/style/variables.scss";@import "@/assets/style/minxin.scss";$src: "${process.env.VUE_APP_SRC}";`,
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false

    },
}
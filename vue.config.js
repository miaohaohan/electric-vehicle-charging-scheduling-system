const path = require('path')
// 将前端代码打包生成gzip文件
const CompressionPlugin = require('compression-webpack-plugin')
// 将前端代码混淆处理
const JavaScriptObfuscator = require('webpack-obfuscator')
const isProduction = false
// 打包后的代码是否加密
const encryption = false
function resolve (dir) {
    return path.join(__dirname, dir)
}
// cdn预加载
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    'vue-antd-ui': 'antd',
    'BMapGL': 'BMapGL',
    'BMapGLLib': 'BMapGLLib'
}
// cdn环境配置
const cdn = {
    // 开发环境
    serve: {
        css: [
            '/static/antd.min.css'
        ],
        js: [
            '/static/vue.min.js',
            '/static/vue-router.min.js',
            '/static/axios.min.js',
            '/static/antd.min.js'
        ]
    },
    // 生产环境
    build: {
        css: [
            '/static/antd.min.css'
        ],
        js: [
            '/static/vue-min.js',
            '/static/vue-router.min.js',
            '/static/axios.min.js',
            '/static/antd.min.js'
        ]
    }
}
// 大概是懂这个cdn配置的意义
module.exports = {
    publicPath: './', //基本路径
    outputDir: 'dist', // 打包后生成的文件夹名字
    assetsDir: 'assets', // 静态资源目录的文件夹名字
    lintOnSave: false, // 是否开启静态资源检测
    productionSourceMap: false, // 生产环境是否生成sourceMap文件
    // 配置静态文件代理
    devServer: {
        // npm run serve 时,是否自动打开页面
        open: true,
        // 匹配本机IP地址
        host: '0.0.0.0',
        // 开发服务器默认端口号
        port: 8008,
        // 静态文件代理
        proxy: {
            '/api': {
                // 此处的写法就是为了将静态文件给代理到开发服务器，解决跨域问题
                target: 'http://10.11.0.244:8888',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathReWrite: {
                    '^/api': 'http://10.11.0.244:8888'
                }
            },
            '/cad': {
                target: 'http://10.11.0.244:8887',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/cad': 'http://10.11.0.244:8887',
                }
            }
        }
    },
    // 显式转义依赖:目的是要让babel去编译node/modules中的文件
    transpileDependencies: ['webpack-dev-server/client'],
    // 链式配置
    chainWebpack: config => {
        // 配置路径
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('layout', resolve('src/layout'))
            .set('base', resolve('src/base'))
            .set('static', resolve('src/static'))
        // 配置html页面的插件
        config.plugin('html').tap(args => {
            if (isProduction) {
                args[0].cdn = cdn.build
            } else {
                args[0].cdn = cdn.serve
            }
            return args
        })
        config.resolve.symlinks(true);
    },
    runtimeCompiler: true,
    configureWebpack: () => {
        // 生产并且加密
        if (isProduction && encryption == true) {
            return {
                plugins: [
                    new CompressionPlugin({
                        algorithm: 'gzip', //'brotliCompress'
                        test: /\.js$|\.html$|\.css/, // + $|\.svg$|\.png$|\.jpg
                        threshold: 10240, //对超过10k的数据压缩
                        deleteOriginalAssets: false, //不删除原文件
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,        // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件

                    }),
                    //js代码加密
                    new JavaScriptObfuscator({
                        rotateUnicodeArray: true, // 必须为true
                        compact: true, // 紧凑 从输出混淆代码中删除换行符。
                        controlFlowFlattening: false, // 此选项极大地影响了运行速度降低1.5倍的性能。 启用代码控制流展平。控制流扁平化是源代码的结构转换，阻碍了程序理解。
                        controlFlowFlatteningThreshold: 0.3,
                        deadCodeInjection: false, // 此选项大大增加了混淆代码的大小（最多200％） 此功能将随机的死代码块（即：不会执行的代码）添加到混淆输出中，从而使得更难以进行反向工程设计。
                        deadCodeInjectionThreshold: 0.3,
                        // 临时关闭以下两项安全配置，后续开启
                        debugProtection: false, // 调试保护  如果您打开开发者工具，可以冻结您的浏览器。
                        debugProtectionInterval: false, // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，这使得使用“开发人员工具”的其他功能变得更加困难。它是如何工作的？一个调用调试器的特殊代码;在整个混淆的源代码中反复插入。
                        disableConsoleOutput: false, // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。

                        domainLock: [], // 锁定混淆的源代码，使其仅在特定域和/或子域上运行。这使得有人只需复制并粘贴源代码并在别处运行就变得非常困难。多个域和子域可以将代码锁定到多个域或子域。例如，要锁定它以使代码仅在www.example.com上运行添加www.example.com，以使其在example.com的任何子域上运行，请使用.example.com。
                        identifierNamesGenerator: 'hexadecimal', // 使用此选项可控制标识符（变量名称，函数名称等）的混淆方式。
                        identifiersPrefix: '', // 此选项使所有全局标识符都具有特定前缀。
                        inputFileName: '',
                        log: false,
                        renameGlobals: false, // 不要启动 通过声明启用全局变量和函数名称的混淆。
                        reservedNames: [], // 禁用模糊处理和生成标识符，这些标识符与传递的RegExp模式匹配。例如，如果添加^ someName，则混淆器将确保以someName开头的所有变量，函数名和函数参数都不会被破坏。
                        reservedStrings: [], // 禁用字符串文字的转换，字符串文字与传递的RegExp模式匹配。例如，如果添加^ some * string，则混淆器将确保以某些字符串开头的所有字符串都不会移动到`stringArray`。
                        rotateStringArray: true, //
                        seed: 0, // 默认情况下（seed = 0），每次混淆代码时都会得到一个新结果（即：不同的变量名，插入stringArray的不同变量等）。如果需要可重复的结果，请将种子设置为特定的整数。
                        selfDefending: false, // 此选项使输出代码能够抵抗格式化和变量重命名。如果试图在混淆代码上使用JavaScript美化器，代码将不再起作用，使得理解和修改它变得更加困难。需要紧凑代码设置。
                        sourceMap: false, // 请确保不要上传嵌入了内嵌源代码的混淆源代码，因为它包含原始源代码。源映射可以帮助您调试混淆的Java Script源代码。如果您希望或需要在生产中进行调试，可以将单独的源映射文件上载到秘密位置，然后将浏览器指向该位置。
                        sourceMapBaseUrl: '', // 这会将源的源映射嵌入到混淆代码的结果中。如果您只想在计算机上进行本地调试，则非常有用。
                        sourceMapFileName: '',
                        sourceMapMode: 'separate',
                        stringArray: true, // 将stringArray数组移位固定和随机（在代码混淆时生成）的位置。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
                        stringArrayEncoding: false, // 此选项可能会略微降低脚本速度。使用Base64或RC4对stringArray的所有字符串文字进行编码，并插入一个特殊的函数，用于在运行时将其解码回来。
                        stringArrayThreshold: 0.2, // 您可以使用此设置调整字符串文字将插入stringArray的概率（从0到1）。此设置在大型代码库中很有用，因为对stringArray函数的重复调用会降低代码的速度。
                        target: 'browser', // 您可以将混淆代码的目标环境设置为以下之一： Browser 、Browser No Eval 、Node 目前浏览器和节点的输出是相同的。
                        transformObjectKeys: false, // 转换（混淆）对象键。例如，此代码var a = {enabled：true};使用此选项进行模糊处理时，将隐藏已启用的对象键：var a = {};a [_0x2ae0 [（'0x0'）] = true;。 理想情况下与String Array设置一起使用。
                        unicodeEscapeSequence: false, // 将所有字符串转换为其unicode表示形式。例如，字符串“Hello World！”将被转换为“'\ x48 \ x65 \ x6c \ x6c \ x6f \ x20 \ x57 \ x6f \ x72 \ x6c \ x64 \ x21”。
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,        // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                    }, ['abc.js']) // abc.js 是不混淆的代码
                ],
                externals: externals,
            }
        }

        if (isProduction && encryption == false) {
            return {
                plugins: [
                    new CompressionPlugin({
                        algorithm: 'gzip', //'brotliCompress'
                        test: /\.js$|\.html$|\.css/, // + $|\.svg$|\.png$|\.jpg
                        threshold: 10240, //对超过10k的数据压缩
                        deleteOriginalAssets: false, //不删除原文件
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,        // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件

                    }),
                ],
                externals: externals,
            }
        } else {
            return {
                externals: externals,
            }
        }

        //2019.8.30
        //解决：[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.(found in <Root>)
        // config.resolve = {
        //   extensions: ['.js', '.vue', '.json', ".css"],
        //   alias: {
        //     'vue$': 'vue/dist/vue.esm.js'
        //   }
        // }
    },
    css: {
        extract: false,//false表示开发环境,true表示生成环境
        sourceMap: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px",    // 需要转换的单位，默认为"px"
                        viewportWidth: 1920,   // 视窗的宽度，对应pc设计稿的宽度，一般是1920
                        viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度,我做的是大屏监控,高度就是1080
                        unitPrecision: 3,        // 单位转换后保留的精度
                        propList: [        // 能转化为vw的属性列表
                            "*"
                        ],
                        viewportUnit: "vw",        // 希望使用的视口单位
                        fontViewportUnit: "vw",        // 字体使用的视口单位
                        selectorBlackList: [],    // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
                        minPixelValue: 1,        // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                        mediaQuery: false,        // 媒体查询里的单位是否需要转换单位
                        replace: true,        // 是否直接更换属性值，而不添加备用属性
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,        // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                    })
                ]
            }
        }
    }
}

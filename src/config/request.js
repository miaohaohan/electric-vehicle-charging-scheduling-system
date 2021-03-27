import axios from 'axios'
import Cookies from 'js-cookie'
import router from '../router'

const codeMessage = {
    0: 'Custom error',
    400: 'The request was made with an error an the server did not perform any operations to create or modify data.',
    401: '登录超时或已经在其他地方登录，请重新登录',
    403: '没有权限访问',
    404: '请求失败',
    406: 'The format of the request is not available.',
    410: 'The requested resource is permanently deleted and will not be retrieved.',
    422: 'A validation error occurred when creating an object.',
    500: '请求服务器出错',
    502: '请求网关出错',
    503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
    504: '请求网关超时'
}

let baseUrl = process.env_VUE_APP_BASE_URL
// axios 的请求最长时间
axios.defaults.timeout = 6000
// axios 的默认路径
axios.defaults.baseURL = baseUrl
// 设置默认参数
const defaultParams = {}

// request 拦截器
console.log(axios.interceptors.request)
axios.interceptors.request.use(config => {
    let token = Cookies.get('token')
    if (config.url.indexOf('/login') === -1) {
        config.headers.token = token
    }
    return config
},
    err => {
        return Promise.reject(err)
    }
)
// response 拦截器
axios.interceptors.response.use(res => {
    if (res.headers.login_url !== undefined) {
        window.location.href = res.headers.login_url
    } else {
        const statusKeys = Object.keys(codeMessage)
        try {
            const {
                data: { code }
            } = res.data
            if (statusKeys.includes(code.toString())) {
                // 隐式报错
                custErrorHandler(res)
                return res
            }
        } catch (e) {
            return res
        }
    }
},
    err => {
        // 显式报错
        errorHandler(err)
    }
)

// 404和500的异常报错处理方式
const specialHandler = (code, url) => {
    // 判断404和500状态码进入相应的页面 前提是不是在登录页面(可以根据请求地址判断 ----> 最粗暴的办法😂)
    switch (code) {
        case 401:
            // 这种情况应该是不会出现在我这里，因为的话我没有做登录的界面
            //router.push('/login')
            break
        case 404:
            router.push('/404')
            break
        case 500:
            router.push('/500')
            break
        case 505:
            // console.log(url)
            break
        default:
            // 🤭这里不可能走到的baseURL
            throw new Error('未处理类型，请放过前端')
    }
}
// 显示异常报错处理
const errorHandler = error => {
    const { responce = {} } = error
    const { status } = responce
    if (responce.config !== undefined) {
        const { config: { url } } = responce
        if ([401, 404, 500, 505].includes[status]) {
            specialHandler(status, url)
        }
    }
}
// 隐式异常报错报错
const custErrorHandler = error => {
    const {
        data: { message },
        config: { url }
    } = error
    message.error(message)
    if ([401, 404, 500, 505].includes(status)) {
        specialHandler(status, url)
    }
}

// 暴露GET请求
export function get (url, params) {
    params = {
        params: params
    }
    return new Promise(resolve => {
        axios.get(url, params).then(res => {
            const { data: data } = res
            resolve(data)
        })
    })
}

// 暴露POST请求
export function post (url, params, headerConfig) {
    return new Promise(resolve => {
        axios.post(url, params, headerConfig).then(res => {
            const { data } = res
            resolve(data)
        })
    })
}

// 暴露PUT请求
export function put (url, params, headerConfig) {
    return new Promise(resolve => {
        axios.put(url, params, headerConfig).then(res => {
            const { data } = res
            resolve(data)
        })
    })
}

// 暴露delete请求
export function del (url, params, headerConfig) {
    params = {
        params
    }
    return new Promise(resolve => {
        axios.delete(url, params, headerConfig).then(res => {
            const { data } = res
            resolve(data)
        })
    })
}

// 文件流 上传 
export function blobStream (url, params, defaultHeader) {
    const headerConfig = {
        ...defaultParams,
        ...defaultHeader,
        headers: { Authorization: 'Bearer ' + this.$Cookies.get('token') },
        responseType: 'arraybuffer'
    }
    return new Promise(() => {
        // 我比较好奇这个上传文件是怎么来实现的
        axios.post(url, params, headerConfig).then(res => {
            const { data } = res
            const aLink = document.createElement('a')
            const blob = new Blob([data], 'application/vnd.ms-excel')
            aLink.href = URL.createObjectURL(blob)
            document.body.appendChild(aLink)
            aLink.click()
            document.body.removeChild(aLink)
        })
    })
}

// 文件流 下载（拼接） 
export function blobDownload (url, params) {
    url += '?access_token=' + this.$Cookies.get('token')
    if (
        typeof params === 'object' &&
        Object.getOwnPropertyNames(params).length > 0
    ) {
        for (let key in params) {
            // if (params.hasOwnProperty(key)) {
            //   url += '&' + key + '=' + params[key]
            // }
        }
    }
    window.open(baseUrl + url)
}

// 文件流 下载（POST） 
export function pBlobDownload (url, params, fileName = '导出数据.xlsx') {
    return new Promise(resolve => {
        axios({
            method: 'post',
            url: url,
            // headers: { Authorization: 'Bearer ' + this.$Cookies.get('token') },
            data: params,
            responseType: 'blob'
        }).then(res => {
            if (!res) {
                resolve(false)
            }
            let url = window.URL.createObjectURL(new Blob([res.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            resolve()
        })
    })
}
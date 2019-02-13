import axios from 'axios'
import querystring from 'querystring'
import qs from 'qs'
import store from '@/store'
import {Message,Confirm} from 'element-ui'
/* eslint-disable */
const timeoutMsg = () => {
  Message({
    message: '请求超时，请检查网络',
    type: 'error'
  })
}

const responseMsg = (res) => {
  Message({
    message: res.msg,
    type: 'error'
  })
}

function handleSession(res) {
  if(res.headers.errorcode && res.headers.errorcode === "4021") {
      Confirm('登录信息过期，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('loginOut').then(() => {
        location.reload()
      })
    })

    // store.dispatch('loginOut').then(res => {
    //   location.reload()
    // })
  }else if(res.headers.errorcode && res.headers.errorcode === "4031") {
    Message({
      message: '权限异常',
      type: 'error'
    })
  }

}

const http ={
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios.get(url,{params:data}).then((response) => {
        handleSession(response)
        resolve(response.data)
      }, (response) => {
        reject(response)
        timeoutMsg()
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      let postdata = querystring.stringify(data)
      axios.post(url, postdata).then((response) => {
        handleSession(response)
        resolve(response.data)
      }).catch((response) => {
        console.log(response)
        resolve(response)
        timeoutMsg()
      })
    })
  },
  postFormData(url,data){
    return new Promise((resolve, reject) => {
      let postdata = data
      let config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
      axios.post(url, postdata, config).then((response) => {
        resolve(response.data)
      }).catch((response) => {
        console.log(response)
        resolve(response)
        timeoutMsg()
      })
    })
  },
  postObject (url, data) {
    return new Promise((resolve, reject) => {
      let postdata = data
      let config = {
        headers: {'Content-Type': 'application/json'}
      }
      axios.post(url, postdata, config).then((response) => {
        resolve(response.data)
      }).catch((response) => {
        console.log(response)
        resolve(response)
        timeoutMsg()
      })
    })
  },
    postNoJson(url, data) {
        return new Promise((resolve, reject) => {
            let postdata = qs.stringify(data,{ indices: false })
            let config = {
                // headers: {'Content-Type': 'application/json'}
            }
            axios.post(url, postdata,config).then((response) => {
                resolve(response.data)
            }).catch((response) => {
                console.log(response)
                resolve(response)
                timeoutMsg()
            })
        })
    },
  delete (url, id) {
    return new Promise((resolve, reject) => {
      axios.post(url + id).then((response) => {
        resolve(response.data)
      }, (response) => {
        reject(response)
        timeoutMsg()
      })
    })
  },
  handleError (res) {
    if(!res){
      Message({
          message: '未知错误',
          type: 'error'
      })
    }
    if (res.code != null) {

    }
    if (res.msg != null) {
      responseMsg(res)
    }
  }
}

const HttpUtils = {
  http
}

const appendHeaders = (headers) => {
  let header = {
  }
  Object.assign(headers, header)
}

HttpUtils.install = function (Vue, options) {
  // axios.defaults.baseURL = process.env.BASE_API
  axios.defaults.timeout = 1000 * 10
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.defaults.withCredentials = true

  // 请求拦截（配置发送请求的信息）
  axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    appendHeaders(config.headers)
    return config
  }, function (error) {
    // 请求失败的处理
    return Promise.reject(error)
  })
  Vue.prototype.$http = http
}

export default HttpUtils

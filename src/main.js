import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App);
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    'pages': ['^pages/login/login'],
    'window': {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#02b0ff',
      'navigationBarTitleText': 'WeChat',
      'navigationBarTextStyle': '#ffffff'
    },
    'tabBar': {
      'selectedColor': '#02b0ff',
      'list': [{
        'pagePath': 'pages/index/index',
        'text': '节点',
        'iconPath': '/static/img/node.png',
        'selectedIconPath': '/static/img/node-active.png'
      }, {
        'pagePath': 'pages/message/message',
        'text': '通知',
        'iconPath': '/static/img/message.png',
        'selectedIconPath': '/static/img/message-active.png'
      }, {
        'pagePath': 'pages/my/my',
        'text': '个人中心',
        'iconPath': '/static/img/my.png',
        'selectedIconPath': '/static/img/my-active.png'
      }]
    }
  }
}

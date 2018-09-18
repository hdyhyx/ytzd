export const ERR_OK = '200'

// ---------------------分装请求
export const host = 'https://www.fzzhengxinyun.com'

function request(url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中', // 提示的内容,
    mask: true // 显示透明蒙层，防止触摸穿透,
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, // 仅为示例，并非真实的接口地址
      data: JSON.stringify(data),
      method: method,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading();
        reject(false)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  })
}

export function get(url, data) {
  return request(url, 'GET', data)
}
export function post(url, data) {
  return request(url, 'POST', data)
}
// ---------------------分装请求

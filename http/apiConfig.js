/* 接口配置 */

const API_BASE_URL = 'http://47.106.104.41:8888';

/* 接口地址： */
const URL = {
  api_start_change: API_BASE_URL + '/image/base64', 
  api_login: API_BASE_URL + '/oauth/login',
  api_share: API_BASE_URL + '/vcoin/incr'
}

module.exports = {
  URL,
}
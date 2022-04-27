import Cookies from 'js-cookie'
import Config from '@/settings'

/**
 * 记住我(JWT) 功能的实现思路:
 * 1.保存用户名密码到 cookie
 * 2.保存Token到cookies
 * 3.rememberMe判断是否要自动登录
 */


const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

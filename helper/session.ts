/**
 * @doc https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage
 */

const key = 'github.accessToken'

export const getAccessToken = () => {
  // sessionStorage に保存したデータを取得する
  return sessionStorage.getItem(key);
}
export const setAccessToken = (token) => {
  // sessionStorage に保存したデータを取得する
  sessionStorage.setItem(key, token);
}

export const resetToken = () => {
  sessionStorage.removeItem(key)
}

export const resetAllSession = () => {
  sessionStorage.clear()
}

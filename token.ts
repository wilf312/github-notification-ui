let firebaseToken = '' // ユーザーがログインしたときにとれる アクエストークン
export const getToken  = (token = '') => {
  return token || firebaseToken
}
export const setToken  = (token) => {
  console.log('setToken', token)
  firebaseToken = token
}

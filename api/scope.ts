/**
 * github の scope をチェックする
 * @doc https://docs.github.com/en/developers/apps/scopes-for-oauth-apps
 */
import {request} from './domain'

/**
 * 権限の取得
 * X-OAuth-Scopes: repo, user
 * X-Accepted-OAuth-Scopes: user
 * @doc https://docs.github.com/en/developers/apps/scopes-for-oauth-apps
 */
export const getScope = () => {
  return request(`/users/codertocat`)
}



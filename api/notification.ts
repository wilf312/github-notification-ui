import {request} from './domain'


/**]
 * 通知を取得する
 * @doc https://docs.github.com/en/rest/reference/activity#list-notifications-for-the-authenticated-user
 */
export const getNotifications = () => {
  console.log('getNotifications')
  return request(`/notifications?all=false&participating=false`)
}
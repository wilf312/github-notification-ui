import {request} from './domain'
import { formatISO } from 'date-fns'

/**
 * 通知を取得する
 * @doc https://docs.github.com/en/rest/reference/activity#list-notifications-for-the-authenticated-user
 */
export const getNotifications = () => {
  return request(`/notifications?all=false&participating=false`, {
    customHeaders: {
      'If-Modified-Since': 'Sun, 06 Sep 2000 00:00:00 GMT'
    }
  })
}

/**
 * 全ての通知を既読にする
 * @doc https://docs.github.com/en/rest/reference/activity#mark-notifications-as-read
 */
export const markNotificationAsRead = () => {
  console.log(formatISO(new Date()))
  return request(`/notifications`, {
    method: 'PUT',
    body: {
      last_read_at: formatISO(new Date())
    }
  })
}

/**
 * スレッドに既読のマークを付ける
 * @doc https://docs.github.com/en/rest/reference/activity#mark-a-thread-as-read
 */
export const markNotificationAsThread = (threadId: string) => {
  return request(`/notifications/threads/${threadId}`, {method: 'PATCH'})
}


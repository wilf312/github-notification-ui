import {markNotificationAsRead} from 'api/notification'
import type {NotificationAddedPRNumber} from 'types/notification'
import {NotificationItem} from 'component/stateless/NotificationItem'

import {useGithubLogin} from './top.hooks'

import styled from 'styled-components'

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 44px;
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  place-items: center;
  white-space: pre-line;

`

export const Top = () => {
  const {isLoggedin, logout, filteredList} = useGithubLogin()

  // ログイン前
  if (!isLoggedin) {
    return <Wrap>login...</Wrap>
  }
  // 1件も通知がない
  if (filteredList.length === 0) {
  return <Wrap>{
    `Congrats!🎉
  You have not notification!`}</Wrap>
  }
  return <div>
    <div>
      <button type="button" onClick={() => {
        markNotificationAsRead()
      }}>mark as all done</button>
    </div>
    <div>
      <button type="button" onClick={() => {
        logout()
      }}>logout</button>
      <button type="button" onClick={() => {
        sessionStorage.clear()
      }}>sessionStorage.clear()</button>
    </div>

    {filteredList.map((d: NotificationAddedPRNumber) => {
      return <NotificationItem key={d.id} notification={d} isOwner={'wilf312' === d.repository.owner.login} />
    })}
  </div>
}
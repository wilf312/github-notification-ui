import { useEffect, useState, useMemo } from "react"
import {getNotifications, markNotificationAsRead} from '../../api/notification'
import {getPullRequest} from '../../api/pulls'
import type {Notification, NotificationAddedPRNumber} from '../../types/notification'
import {NotificationItem} from '../../component/stateless/NotificationItem'

import {useGithubLogin} from './top.hooks'

export const Top = () => {
  const [list, setList] = useState<NotificationAddedPRNumber[]>([])
  const {isLoggedin, logout} = useGithubLogin()

  useEffect(() => {
    if (!isLoggedin) {
      return
    }
    getNotifications().then(d => {
      console.log(d)
      if (d.status === 200) {
        return d.json()
      } else {
        return []
      }
    }).then(value => {
      console.log(value)

      const valueAddedPRNumber: NotificationAddedPRNumber[] = value.map((d: Notification): NotificationAddedPRNumber => {
        
        var a = d.subject.url.split('/')
        
        return {
          ...d,
          prNumber: a[a.length -1]
        }
      })

      setList(valueAddedPRNumber)
    })
  }, [isLoggedin])


  const filteredList = useMemo(() => {
    // return list.filter(item => item.subject.type === 'PullRequest')
    return list
  }, [list])


  if (!isLoggedin) {
    return <div>認証中</div>
  }
  return <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css/dist/dark.min.css" />

    <div>
      <button type="button" onClick={() => {
        markNotificationAsRead()
      }}>mark as all done</button>
    </div>
    <div>
      デバッグ用

      logout
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
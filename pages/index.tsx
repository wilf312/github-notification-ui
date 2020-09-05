import { useEffect, useState, useMemo } from "react"
import {getNotifications, markNotificationAsRead} from '../api/notification'
import {getPullRequest} from '../api/pulls'
import type {Notification, NotificationAddedPRNumber} from '../types/notification'
import notification from "./api/notification"
import {NotificationItem} from '../component/stateless/NotificationItem'

export default function index() {
  const [list, setList] = useState<NotificationAddedPRNumber[]>([])
  useEffect(() => {
    getNotifications().then(d => {
      console.log(d)
      return d.json()
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
  }, [])

  const filteredList = useMemo(() => {
    // return list.filter(item => item.subject.type === 'PullRequest')
    return list
  }, [list])
  return <div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css/dist/dark.min.css" />

    <div>
      <button type="button" onClick={() => {
        markNotificationAsRead()
      }}>mark as all done</button>
    </div>

    {filteredList.map((d: NotificationAddedPRNumber) => {
      return <NotificationItem key={d.id} notification={d} isOwner={'wilf312' === d.repository.owner.login} />
    })}
  </div>
}
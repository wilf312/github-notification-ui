import { NotificationAddedPRNumber } from '../../types/notification'
import { useEffect, useState } from 'react'
import {getPullRequest, Pulls} from '../../api/pulls'
import { isWorker } from 'cluster'

type props = {
  notification: NotificationAddedPRNumber,
  isOwner: boolean
}
export const NotificationItem = (props: props) => {
  const notification = props.notification
  const [pr, setPr] = useState<Pulls | null>(null)

  useEffect(() => {
    if (!props.isOwner) {
      return
    }
    // APIで PRの情報を取得してこのコンポーネントに格納する
    getPullRequest({
      owner: props.notification.repository.owner.login,
      number: props.notification.prNumber,
      repository: props.notification.repository.name
    }).then(v => v.json()).then((d: Pulls) => {
      console.log(d)
      setPr(d)
    })
  }, [props.notification.id])

  return <div key={notification.id} style={{
    margin: '16px',
    padding: '8px',
    border: 'solid black 1px'
  }}>
    {/* {props.isOwner && pr?.state === 'open' && */}
    {props.isOwner &&
      <div>
        <button type="button" onClick={() => {
          console.log('merge')
        }}>merge</button>
        <button type="button" onClick={() => {
          console.log('read')
        }}>read</button>
      </div>
    }

    <a href={`https://github.com/${notification.repository.full_name}/pull/${notification.prNumber}`} target="_blank"> 
      <h2>{pr?.state}</h2>
      <h2>{notification.subject.title}</h2>
      <p>{notification.repository.name}</p>
      <p>{notification.repository.owner.login}</p>
      <p>{notification.reason}</p>
      <p>{notification.unread ? 'unread' : 'read'}</p>
      <p>{notification.subject.type}</p>
    </a>
  </div>
}
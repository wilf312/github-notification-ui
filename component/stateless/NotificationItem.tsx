import { NotificationAddedPRNumber } from 'types/notification'
import { useEffect, useState } from 'react'
import {getPullRequest, Pulls, mergePullRequest} from 'api/pulls'
import {markNotificationAsThread} from 'api/notification'

type props = {
  notification: NotificationAddedPRNumber,
  isOwner: boolean
  getNotification: () => void
}
export const NotificationItem = (props: props) => {
  const notification = props.notification
  const repository = props.notification.repository
  const [pr, setPr] = useState<Pulls | null>(null)

  useEffect(() => {
    if (!props.isOwner) {
      return
    }
    // APIで PRの情報を取得してこのコンポーネントに格納する
    getPullRequest({
      owner: repository.owner.login,
      number: props.notification.prNumber,
      repository: repository.name
    }).then(v => v.json()).then((d: Pulls) => {
      setPr(d)
    })
  }, [props.notification.id])

  return <div key={notification.id} style={{
    margin: '16px',
    padding: '8px',
    border: 'solid black 1px'
  }}>
    {props.isOwner && pr?.state === 'open' &&
      <div>
        <button type="button" onClick={async () => {
          await mergePullRequest({
            owner: repository.owner.login,
            repository: repository.name,
            base: pr.base.ref,
            head: pr.head.ref
          })
          await markNotificationAsThread(notification.id)
          props.getNotification()
        }}>merge</button>
      </div>
    }
    <button type="button" onClick={() => {
      markNotificationAsThread(notification.id)
    }}>read</button>

    <a href={`https://github.com/${repository.full_name}/pull/${notification.prNumber}`} target="_blank"> 
      <h2>{pr?.state}</h2>
      <h2>{notification.subject.title}</h2>
      <p>{`${repository.owner.login}/${repository.name}`}</p>
    </a>
  </div>
}
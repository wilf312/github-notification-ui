import {request} from './domain'

export type { Pulls } from './pulls.type'

/**
 * 単体のPull requestの情報を取得する
 * @doc https://docs.github.com/en/rest/reference/pulls#get-a-pull-request
 */
export const getPullRequest = ({owner, repository, number}) => {
  console.log('getPullRequest')
  return request(`/repos/${owner}/${repository}/pulls/${number}`)
}


/**
 * Pull requestをマージする
 * @doc https://docs.github.com/en/rest/reference/repos#merging
 */
type mergePullRequestProps = {
  owner: string
  repository: string
  base: string
  head: string
  commit_message?: string
}
export const mergePullRequest = ({owner, repository, base, head, commit_message}: mergePullRequestProps) => {
  console.log('getPullRequest')
  return request(`/repos/${owner}/${repository}/merges`, {
    method: 'POST',
    body: {
      base,
      head,
      commit_message
    }
  })
}



// curl \
//   -H "Accept: application/vnd.github.v3+json" \
//   https://api.github.com/orgs/ORG/repos

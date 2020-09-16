import { useEffect, useState, useCallback } from "react"

import {setToken} from "../../token"
import firebase from 'globalPlugin/firebase'
import {getAccessToken, setAccessToken} from 'helper/session'
import {getScope} from 'api/scope'

type scope = {
  acceptedScope: string | null // アクションがチェックするスコープをリスト
  scope: string | null // トークンが承認したスコープ
}

export const useGithubLogin = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false)
  const [scope, setScope] = useState<scope | null>(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {
      if(user && getAccessToken()) {
        setIsLoggedin(true)
        setToken(getAccessToken())
      }
      else {
        const provider = new firebase.auth.GithubAuthProvider()
        provider.addScope('repo')
        provider.addScope('notifications')
        firebase.auth().signInWithPopup(provider).then((result) => {
          const oauth = result.credential as firebase.auth.OAuthCredential

          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          // PR: https://github.com/firebase/firebase-js-sdk/pull/3773#issuecomment-691599798
          const token = oauth.accessToken
    
          // The signed-in user info.
          const user = result.user;

          console.warn(user, 'not use')
    
          setIsLoggedin(true)
          // APIコール時に api/domain で使う
          setToken(token)
          // session storageに格納する
          setAccessToken(token)
    
        }).catch(function(error) {
          console.log('auth error', error)
          // Handle Errors here.
          console.error(error.code)
          console.error(error.message)
          // The email of the user's account used.
          console.error(error.email)
          // The firebase.auth.AuthCredential type that was used.
          console.error(error.credential)
        });
      }
    });
  }, [])


  useEffect(() => {
    if (!isLoggedin) {
      return
    }
    getScope().then((d: Response) => {
      setScope({
        acceptedScope: d.headers.get('X-Accepted-OAuth-Scopes'),
        scope: d.headers.get('X-OAuth-Scopes'),
      })
    })
  }, [isLoggedin])

  const logout = useCallback(() => {
    if (!isLoggedin) {
      console.warn('not logged in!')
      return
    }
    firebase.auth().signOut().then(function() {
      console.log('Sign-out successful')
    }).catch(function(error) {
      // An error happened.
    });
  }, [])


  return {
    isLoggedin,
    scope,
    logout
  }
}
import { useState, useEffect } from 'react'

import firebase from '../firebase'

const useProvideAuth = () => {
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getAuth = async () => {
      setIsLoading(true)
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log('uid', uid)
          setUserId(uid)
          setIsLoading(false)
          // ...
        } else {
          // User is signed out
          // ...
          setUserId('')
          setIsLoading(false)
        }
      });
    }

    getAuth()
  }, [userId])

  return {
    isLoading,
    userId,
  }
}

export default useProvideAuth

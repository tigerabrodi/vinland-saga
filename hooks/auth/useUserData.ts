import { doc, onSnapshot } from 'firebase/firestore'
import { auth, firebaseDb } from '@lib/firebase/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from '@hooks/auth/useAuthState'
import { UserData } from '@lib/types'
import { useLoadingStore } from '@lib/store'

type Chef = {
  username: string
}

export function useUserData(): UserData {
  const { user } = useAuthState(auth)
  const { setStatus } = useLoadingStore()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    let unsubscribe
    setStatus('loading')

    if (user) {
      unsubscribe = onSnapshot(doc(firebaseDb, 'chefs', user.uid), (doc) => {
        if (doc.data()) {
          setUsername((doc.data() as Chef).username)
        }
        setStatus('success')
      })
    } else {
      setUsername(null)
      setStatus('error')
    }

    return unsubscribe
  }, [setStatus, user, username])

  return { username, user }
}

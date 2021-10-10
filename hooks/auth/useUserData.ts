import { doc, onSnapshot } from 'firebase/firestore'
import { auth, firebaseDb } from '@lib/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from '@hooks/auth/useAuthState'
import { UserData } from '@lib/types'
import { useLoadingStore } from '@lib/store'

type User = {
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
      unsubscribe = onSnapshot(doc(firebaseDb, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          setUsername((doc.data() as User).username)
          setStatus('success')
        }
      })
    } else {
      setUsername(null)
      setStatus('error')
    }

    return unsubscribe
  }, [setStatus, user, username])

  return { username, user }
}

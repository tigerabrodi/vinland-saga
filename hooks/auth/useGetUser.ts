import { getUserWithUsername } from '@lib/firebase/firebase'
import { useLoadingStore } from '@lib/store'
import { UserProfile } from '@lib/types'
import * as React from 'react'
import { useUserData } from './useUserData'

export const useGetUser = (username: string | null) => {
  const [user, setUser] = React.useState<UserProfile | null>(null)
  const { user: currentAuthUser } = useUserData()
  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    if (user || !username) {
      return
    }

    const setUserState = async () => {
      setStatus('loading')
      setUser((await getUserWithUsername(username)) as UserProfile)
      setStatus('success')
    }
    setUserState()
  }, [username, setStatus, user, currentAuthUser])

  return { user }
}

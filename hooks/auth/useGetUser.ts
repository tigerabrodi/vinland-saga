import { getUserWithUsername } from '@lib/firebase'
import { useLoadingStore } from '@lib/store'
import { UserProfile } from '@lib/types'
import * as React from 'react'

export const useGetUser = (username: string | null) => {
  const [user, setUser] = React.useState<UserProfile | null>(null)
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
  }, [username, setStatus, user])

  return { user }
}

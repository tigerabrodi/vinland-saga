import { getUserWithUsername } from '@lib/firebase/get-utils'
import { useLoadingStore } from '@lib/store'
import { ChefProfile } from '@lib/types'
import * as React from 'react'
import { useUserData } from './useUserData'

export const useGetUser = (username: string | null) => {
  const [user, setUser] = React.useState<ChefProfile | null>(null)
  const { user: currentAuthUser } = useUserData()
  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    if (user || !username) {
      return
    }

    const setUserState = async () => {
      setStatus('loading')
      setUser((await getUserWithUsername(username)) as ChefProfile)
      setStatus('success')
    }
    setUserState()
  }, [username, setStatus, user, currentAuthUser])

  return { user }
}

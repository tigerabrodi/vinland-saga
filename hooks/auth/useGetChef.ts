import { getUserWithUsername } from '@lib/firebase/get-utils'
import { useLoadingStore } from '@lib/store'
import { ChefProfile } from '@lib/types'
import * as React from 'react'
import { useUserData } from './useUserData'

export const useGetChef = (username: string | null) => {
  const [chef, setChef] = React.useState<ChefProfile | null>(null)
  const { user: currentAuthUser } = useUserData()
  const { setStatus } = useLoadingStore()

  React.useEffect(() => {
    if (chef || !username) {
      return
    }

    const setChefState = async () => {
      setStatus('loading')
      setChef((await getUserWithUsername(username)) as ChefProfile)
      setStatus('success')
    }
    setChefState()
  }, [username, setStatus, chef, currentAuthUser])

  return { chef }
}

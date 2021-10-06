import { User, Auth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useLoadingValue } from '@hooks/auth/useLoadingValue'

export const useAuthState = (auth: Auth) => {
  const {
    error,
    loading,
    setError,
    setValue,
    value: user,
  } = useLoadingValue<User | null, Error>(() => auth.currentUser)

  useEffect(() => {
    const listener = onAuthStateChanged(auth, setValue, setError)

    return () => {
      listener()
    }
  }, [auth, setError, setValue])

  return {
    user,
    loading,
    error,
  }
}

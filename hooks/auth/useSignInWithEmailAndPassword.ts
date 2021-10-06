import { useState } from 'react'
import { signInWithEmailAndPassword as signInWithEmailAndPasswordAuth } from '@firebase/auth'
import { auth } from '@lib/firebase'
import { useLoadingStore } from '@lib/store'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export const useSignInWithEmailAndPassword = () => {
  const [signInError, setSignInError] = useState(false)
  const { setStatus } = useLoadingStore()
  const router = useRouter()

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setStatus('loading')
    try {
      await signInWithEmailAndPasswordAuth(auth, email, password)

      setStatus('success')
      router.push('/')
      toast.success('Successfully signed in into your account.')
    } catch (error) {
      setSignInError(true)
      setStatus('error')
      setTimeout(() => {
        setSignInError(false)
      }, 3000)
    }
  }

  return {
    signInWithEmailAndPassword,
    signInError,
  }
}

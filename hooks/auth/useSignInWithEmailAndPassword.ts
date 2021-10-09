import { useState } from 'react'
import { signInWithEmailAndPassword as signInWithEmailAndPasswordAuth } from '@firebase/auth'
import { auth } from '@lib/firebase'
import { useLoadingStore } from '@lib/store'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export const useSignInWithEmailAndPassword = () => {
  const [isSignInError, setIsSignInError] = useState(false)
  const { setStatus } = useLoadingStore()
  const router = useRouter()

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setStatus('loading')
    try {
      await signInWithEmailAndPasswordAuth(auth, email, password)

      router.push('/')
      toast.success('Successfully signed in into your account.')
      setStatus('success')
    } catch (error) {
      setIsSignInError(true)
      setStatus('error')
      setTimeout(() => {
        setIsSignInError(false)
      }, 3000)
    }
  }

  return {
    signInWithEmailAndPassword,
    isSignInError,
  }
}

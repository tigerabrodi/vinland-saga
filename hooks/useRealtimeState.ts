import * as React from 'react'
import { useLoadingStore } from '@lib/store'
import { doc, onSnapshot } from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase'

export const useRealtimeState = <T>(path: string) => {
  const { setStatus } = useLoadingStore()
  const [state, setState] = React.useState<null | T>(null)

  React.useEffect(() => {
    setStatus('loading')
    const unsubscribe = onSnapshot(doc(firebaseDb, path), (doc) => {
      if (doc.exists()) {
        setState(doc.data() as T)
        setStatus('success')
      }
    })

    return unsubscribe
  }, [path, setStatus])

  return state
}

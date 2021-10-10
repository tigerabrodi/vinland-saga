import * as React from 'react'
import { useLoadingStore } from '@lib/store'
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  onSnapshot,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase'

export const useRealtimeState = (path: string) => {
  const { setStatus } = useLoadingStore()
  const [state, setState] =
    React.useState<null | DocumentSnapshot<DocumentData>>(null)

  React.useEffect(() => {
    setStatus('loading')
    const unsubscribe = onSnapshot(doc(firebaseDb, path), (doc) => {
      setState(doc)
      setStatus('success')
    })

    return unsubscribe
  }, [path, setStatus])

  return state
}

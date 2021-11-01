import * as React from 'react'
import { useLoadingStore } from '@lib/store'
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from '@firebase/firestore'
import { firebaseDb } from '@lib/firebase/firebase'

export const useRealtimeState = <Data>(path: string) => {
  const { setStatus } = useLoadingStore()
  const [state, setState] = React.useState<null | DocumentSnapshot<Data>>(null)

  React.useEffect(() => {
    setStatus('loading')
    const unsubscribe = onSnapshot<Data>(
      doc(firebaseDb, path) as DocumentReference<Data>,
      (doc) => {
        setState(doc)
        setStatus('success')
      }
    )

    return unsubscribe
  }, [path, setStatus])

  return state
}

import * as React from 'react'

export const useUnload = (fn: () => void) => {
  const callback = React.useRef(fn)

  React.useEffect(() => {
    const onUnload = callback.current
    window.addEventListener('beforeunload', onUnload)
    return () => {
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [callback])
}

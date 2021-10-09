import * as React from 'react'

export const useCloseEscape = (callback: () => void) => {
  const escapeCloseModal = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    },
    [callback]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', escapeCloseModal, false)

    return () => {
      document.removeEventListener('keydown', escapeCloseModal, false)
    }
  }, [escapeCloseModal])
}

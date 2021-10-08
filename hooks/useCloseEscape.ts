import * as React from 'react'

export const useCloseEscape = (callback: () => void) => {
  // Use callback needed for the useEffect to rerun, so it always returns the same function and doesn't create a new one
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

import * as React from 'react'

type ClickOutsideParams = {
  ref: React.RefObject<HTMLDivElement>
  callback: () => void
  shouldTriggerCallback: boolean
}

export const useClickOutside = ({
  ref,
  callback,
  shouldTriggerCallback,
}: ClickOutsideParams) => {
  // Wrapped in useCallback in order to avoid making the effect run everytime
  const handleClick = React.useCallback(
    (event: Event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        shouldTriggerCallback
      ) {
        callback()
      }
    },
    [callback, shouldTriggerCallback, ref]
  )

  React.useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])
}

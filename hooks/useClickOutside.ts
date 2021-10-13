import * as React from 'react'

type ClickOutsideParams<T extends HTMLElement = HTMLDivElement> = {
  ref: React.RefObject<T>
  callback: () => void
  shouldTriggerCallback: boolean
}

export const useClickOutside = <T extends HTMLElement>({
  ref,
  callback,
  shouldTriggerCallback,
}: ClickOutsideParams<T>) => {
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

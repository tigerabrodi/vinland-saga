import * as React from 'react'

type ClickOutsideParams<Element extends HTMLElement = HTMLDivElement> = {
  ref: React.RefObject<Element>
  callback: () => void
  shouldTriggerCallback: boolean
}

export const useClickOutside = <Element extends HTMLElement>({
  ref,
  callback,
  shouldTriggerCallback,
}: ClickOutsideParams<Element>) => {
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

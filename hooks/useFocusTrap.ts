import * as React from 'react'
import { useRef, useEffect } from 'react'
import { setUpFocusTrap } from '../lib/focus-trap'

export const useFocusTrap = <T extends HTMLElement = HTMLDivElement>(
  stateOfComponent: boolean
): React.RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      const restoreFocus = setUpFocusTrap(ref.current as HTMLElement)

      return restoreFocus
    }
  }, [stateOfComponent])

  return ref
}

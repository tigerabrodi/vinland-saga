import * as React from 'react'
import { useRef, useEffect } from 'react'
import { setUpFocusTrap } from '../lib/focus-trap'

export const useFocusTrap = <Element extends HTMLElement = HTMLDivElement>(
  stateOfComponent: boolean
): React.RefObject<Element> => {
  const ref = useRef<Element>(null)

  useEffect(() => {
    if (ref.current) {
      const restoreFocus = setUpFocusTrap(ref.current as HTMLElement)

      return restoreFocus
    }
  }, [stateOfComponent])

  return ref
}

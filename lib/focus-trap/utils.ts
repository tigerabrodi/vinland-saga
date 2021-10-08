export const FOCUSABLE_ELEMENTS = [
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  '[href]:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
]

export function isVisible(element: HTMLElement) {
  return !!(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  )
}

export function isTabKeyPressed(event: KeyboardEvent) {
  return event.key === 'Tab'
}

export function getFocusableElements(
  trappedElement: HTMLElement
): HTMLElement[] {
  const focusableElements = Array.prototype.slice.call(
    trappedElement.querySelectorAll(FOCUSABLE_ELEMENTS.join())
  )
  const visibleFocusableElements = focusableElements.filter(isVisible)

  if (visibleFocusableElements.length === 0) {
    throw new TypeError(
      'There are no focusable elements in the trapped element provided'
    )
  }

  return visibleFocusableElements
}

export function getKeyDownEventHandler(
  firstElement: HTMLElement,
  lastElement: HTMLElement
) {
  return function (event: KeyboardEvent) {
    if (!isTabKeyPressed(event)) {
      return
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }
}

export function getDisengageFocusTrapCallback(
  trappedElement: HTMLElement,
  keyDownEventHandler: (event: KeyboardEvent) => void,
  lastActiveElement: HTMLElement
) {
  return function () {
    trappedElement.removeEventListener('keydown', keyDownEventHandler)

    if (lastActiveElement) {
      lastActiveElement.focus()
    }
  }
}

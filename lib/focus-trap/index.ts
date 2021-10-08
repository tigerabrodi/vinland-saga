import {
  getFocusableElements,
  getKeyDownEventHandler,
  getDisengageFocusTrapCallback,
} from './utils'

export function setUpFocusTrap(
  trappedElement: HTMLElement
): (element?: HTMLElement) => void {
  const lastActiveElement = document.activeElement as HTMLElement
  const focusableElements = getFocusableElements(trappedElement)
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]
  const keyDownEventHandler = getKeyDownEventHandler(
    firstFocusableElement,
    lastFocusableElement
  )

  // Engage focus trap.
  trappedElement.addEventListener('keydown', keyDownEventHandler)

  if (firstFocusableElement) {
    firstFocusableElement.focus()
  }

  // Return a callback that allows to disengage the focus trap
  // and also restore the focus back to the appropriate element in the page.
  return getDisengageFocusTrapCallback(
    trappedElement,
    keyDownEventHandler,
    lastActiveElement
  )
}

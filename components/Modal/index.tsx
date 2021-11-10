import * as React from 'react'
import { useFocusTrap } from '@hooks/useFocusTrap'
import { useCloseEscape } from '@hooks/useCloseEscape'
import { useClickOutside } from '@hooks/useClickOutside'
import { CloseButton, ModalBackground, ModalWrapper, Title } from './styles'
import { CloseIcon } from 'Icons/Close'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  title: string
  isConfirmationModal?: boolean
}

export const Modal = ({
  children,
  isOpen,
  isConfirmationModal,
  setIsOpen,
  title,
}: Props) => {
  const modalRef = useFocusTrap(isOpen)

  useClickOutside({
    ref: modalRef,
    callback: () => setIsOpen(false),
    shouldTriggerCallback: isOpen,
  })

  useCloseEscape(() => setIsOpen(false))

  return (
    <>
      <ModalWrapper
        role={isConfirmationModal ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby="modalTitle"
        ref={modalRef}
      >
        <Title id="modalTitle">{title}</Title>
        <CloseButton
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <CloseIcon />
        </CloseButton>
        {children}
      </ModalWrapper>
      <ModalBackground />
    </>
  )
}

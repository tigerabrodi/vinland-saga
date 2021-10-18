import * as React from 'react'
import { Modal } from '@components/Modal'
import { Text, ButtonWrapper, ConfirmButton, CancelButton } from './styles'

type Props = {
  isOpen: boolean
  text: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSuccess: () => void
}

export const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  onSuccess,
  text,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Are you sure?"
      isConfirmationModal
    >
      <Text>{text}</Text>
      <ButtonWrapper>
        <ConfirmButton onClick={() => onSuccess()}>Yes</ConfirmButton>
        <CancelButton onClick={() => setIsOpen(false)}>No</CancelButton>
      </ButtonWrapper>
    </Modal>
  )
}

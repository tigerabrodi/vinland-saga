import { Modal } from '@components/Modal'
import { Text, ButtonWrapper, ConfirmButton, CancelButton } from './styles'

type Props = {
  isOpen: boolean
  text: string
  setIsOpen: (state: boolean) => void
}

export const ConfirmationModal = ({ isOpen, setIsOpen, text }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Are you sure?"
      isConfirmationModal
    >
      <Text>{text}</Text>
      <ButtonWrapper>
        <ConfirmButton>Yes</ConfirmButton>
        <CancelButton>No</CancelButton>
      </ButtonWrapper>
    </Modal>
  )
}

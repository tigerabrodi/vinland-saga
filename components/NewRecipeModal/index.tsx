import * as React from "react";

import { useFocusTrap } from "@hooks/useFocusTrap";
import { useFormState } from "@hooks/useFormState";
import { useNewRecipeStore } from "@lib/store";
import {
  Modal,
  ModalBackground,
  Form,
  Title,
  CreateButton,
  Close,
  CloseButton,
  Label,
  Input,
} from "./styles";
import { useCloseEscape } from "@hooks/useCloseEscape";

export const NewRecipeModal = () => {
  const {
    handleChange,
    formState: { title },
  } = useFormState({ title: "" });

  const { setIsModalOpen, isModalOpen } = useNewRecipeStore();

  const modalRef = useFocusTrap();

  useCloseEscape(() => setIsModalOpen(false));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  return isModalOpen ? (
    <>
      <Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        ref={modalRef}
      >
        <Title id="modalTitle">Create Recipe</Title>
        <CloseButton type="button" onClick={() => setIsModalOpen(false)}>
          <Close />
        </CloseButton>
        <Form onSubmit={handleSubmit}>
          <Label>Title</Label>
          <Input
            placeholder="Chicken Tikka"
            name="title"
            onChange={handleChange}
            value={title}
          />
          <CreateButton type="submit">Create</CreateButton>
        </Form>
      </Modal>
      <ModalBackground />
    </>
  ) : null;
};

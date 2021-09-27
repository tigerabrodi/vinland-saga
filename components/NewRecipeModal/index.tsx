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
import { useClickOutside } from "@hooks/useClickOutside";

export const NewRecipeModal = () => {
  const {
    handleChange,
    formState: { title },
  } = useFormState({ title: "" });

  const { setIsModalOpen, isModalOpen } = useNewRecipeStore();

  const modalRef = useFocusTrap();

  useClickOutside({
    ref: modalRef,
    callback: () => setIsModalOpen(false),
    shouldTriggerCallback: isModalOpen,
  });

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
        <CloseButton
          type="button"
          onClick={() => setIsModalOpen(false)}
          aria-label="Close"
        >
          <Close />
        </CloseButton>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="Chicken Tikka"
            name="title"
            id="title"
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

import { useRef, useEffect } from "react";
import focusTrap from "modal-focus-trap";
import { useNewRecipeStore } from "@lib/store";

export const useFocusTrap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isModalOpen } = useNewRecipeStore();

  useEffect(() => {
    if (ref.current) {
      const buttonToRecieveFocus = document.activeElement as HTMLElement;
      const destroy = focusTrap(ref.current as HTMLElement);

      const unmount = () => {
        buttonToRecieveFocus.focus();
        destroy();
      };

      return unmount;
    }
  }, [isModalOpen]);

  return ref;
};

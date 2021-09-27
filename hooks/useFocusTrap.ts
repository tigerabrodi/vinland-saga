import { useRef, useEffect } from "react";
import { useNewRecipeStore } from "@lib/store";
import { setUpFocusTrap } from "./focus-trap";

export const useFocusTrap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isModalOpen } = useNewRecipeStore();

  useEffect(() => {
    if (ref.current) {
      const restoreFocus = setUpFocusTrap(ref.current as HTMLElement);

      return restoreFocus;
    }
  }, [isModalOpen]);

  return ref;
};

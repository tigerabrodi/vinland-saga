import { useRef, useEffect } from "react";
import focusTrap from "modal-focus-trap";

export const useFocusTrap = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Create on didMount.
  useEffect(() => {
    const destroy = focusTrap(ref.current as HTMLElement);

    // Destroy on willUnmount.
    return destroy;
  }, []);

  return ref;
};

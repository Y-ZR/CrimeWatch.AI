import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";

export const DialogContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay />
      <DialogPrimitive.Content {...props} ref={forwardedRef}>
        {children}
        <DialogPrimitive.Close aria-label="Close">
          <Cross1Icon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

export const Dialog = ({ children, isOpen, onOpenChange }) => (
  <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
    {children}
  </DialogPrimitive.Root>
);

export const DialogTrigger = DialogPrimitive.Trigger;

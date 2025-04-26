import { Dialog, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { memo } from "react";

export type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

export const sizeClasses: Record<ModalSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

type ModalProps = {
  show?: boolean;
  size?: ModalSize;
  onClose?: () => void;
  children: React.ReactNode;
  dialogClassName?: string;
};

export const Modal: React.FC<ModalProps> = ({
  show,
  onClose = () => ({}),
  children,
  size = "md",
  ...props
}) => {
  return (
    <>
      <Dialog
        open={show}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={onClose}
      >
        <div className="fixed inset-0 z-10 w-[100dvw] overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className={clsx(
                "w-full rounded-xl bg-white p-6",
                "duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0",
                sizeClasses[size],
                props.dialogClassName
              )}
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default memo(Modal);

import { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";

interface ConfirmModalProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({ title, description, children, onConfirm }: ConfirmModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
          <DialogDescription className="text-left">{description}</DialogDescription>
        </DialogHeader>

        <div data-slot="dialog-footer" className="flex justify-center gap-2">
          <button
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-black/70 dark:hover:bg-white/70 w-full cursor-pointer"
            onClick={onConfirm}
          >
            확인
          </button>
          <DialogClose asChild>
            <button className="px-4 py-2 rounded-xl border-2 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 w-full cursor-pointer dark:text-gray-300">
              취소
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;

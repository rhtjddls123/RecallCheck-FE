interface CancelButtonProps {
  disabled: boolean;
  onCancel: () => void;
}

const CancelButton = ({ disabled, onCancel }: CancelButtonProps) => {
  return (
    <button
      onClick={onCancel}
      disabled={disabled}
      className="w-fit px-3 py-1.5 text-xs font-medium rounded-full border border-red-300 dark:border-red-800
          text-red-600 dark:text-red-400 bg-white dark:bg-zinc-800 hover:bg-indigo-50 dark:hover:bg-zinc-700 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
    >
      취소
    </button>
  );
};

export default CancelButton;

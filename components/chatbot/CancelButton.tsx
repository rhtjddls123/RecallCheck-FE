interface CancelButtonProps {
  disabled: boolean;
  onCancel: () => void;
}

const CancelButton = ({ disabled, onCancel }: CancelButtonProps) => {
  return (
    <button
      onClick={onCancel}
      disabled={disabled}
      className="w-fit px-3 py-1.5 text-xs font-medium rounded-full border border-red-300
              text-red-600 bg-white hover:bg-indigo-50 active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
    >
      취소
    </button>
  );
};

export default CancelButton;

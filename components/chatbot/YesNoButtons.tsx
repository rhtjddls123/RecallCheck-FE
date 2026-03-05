interface YesNoButtonsProps {
  disabled: boolean;
  onYes: () => void;
  onNo: () => void;
}

const YesNoButtons = ({ disabled, onYes, onNo }: YesNoButtonsProps) => {
  return (
    <div className="flex gap-2 mt-1">
      <button
        onClick={onYes}
        disabled={disabled}
        className="px-4 py-2 text-sm rounded-full bg-indigo-500 text-white
                   hover:bg-indigo-600 active:scale-95 disabled:opacity-40
                   disabled:cursor-not-allowed transition-all duration-150"
      >
        예
      </button>
      <button
        onClick={onNo}
        disabled={disabled}
        className="px-4 py-2 text-sm rounded-full bg-gray-200 text-gray-700
                   hover:bg-gray-300 active:scale-95 disabled:opacity-40
                   disabled:cursor-not-allowed transition-all duration-150"
      >
        아니오
      </button>
    </div>
  );
};

export default YesNoButtons;

import { CATEGORIES, MainCategory } from "@/const/category.const";

interface CategoryButtonsProps {
  disabled: boolean;
  onSelect: (cat: MainCategory) => void;
  onUnknown: () => void;
}

const CategoryButtons = ({ disabled, onSelect, onUnknown }: CategoryButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {(Object.keys(CATEGORIES) as MainCategory[]).map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          disabled={disabled}
          className="px-3 py-1.5 text-xs font-medium rounded-full border border-indigo-300
                       text-indigo-600 bg-white hover:bg-indigo-50 active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          {cat}
        </button>
      ))}
      <button
        onClick={onUnknown}
        disabled={disabled}
        className="px-3 py-1.5 text-xs font-medium rounded-full border border-emerald-300
                       text-emerald-600 bg-white hover:bg-emerald-50 active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
      >
        모르겠어요
      </button>
    </div>
  );
};

export default CategoryButtons;

import { CATEGORIES, MainCategory } from "@/const/category.const";

interface CategoryButtonsProps {
  disabled: boolean;
  onSelect: (cat: MainCategory) => void;
}

const CategoryButtons = ({ disabled, onSelect }: CategoryButtonsProps) => {
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
    </div>
  );
};

export default CategoryButtons;

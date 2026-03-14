import { CATEGORIES, MainCategory } from "@/const/category.const";
import CancelButton from "./CancelButton";
import { RECALL_CATEGORY_KEY_TYPE } from "@/const/RECALL_CATEGORY_KEY_MAP.const";

interface SubCategoryButtonsProps {
  category: MainCategory;
  disabled: boolean;
  onSelect: (sub: RECALL_CATEGORY_KEY_TYPE) => void;
  onCancel: () => void;
}

const SubCategoryButtons = ({
  category,
  disabled,
  onSelect,
  onCancel
}: SubCategoryButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {CATEGORIES[category].map((sub) => (
        <button
          key={sub}
          onClick={() => onSelect(sub)}
          disabled={disabled}
          className="px-3 py-1.5 text-xs font-medium rounded-full border border-emerald-300 dark:border-emerald-700
             text-emerald-600 dark:text-emerald-400 bg-white dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-zinc-700 active:scale-95
             disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
        >
          {sub}
        </button>
      ))}
      <CancelButton disabled={disabled} onCancel={onCancel} />
    </div>
  );
};

export default SubCategoryButtons;

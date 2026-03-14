const TypingIndicator = () => {
  return (
    <div className="flex items-end gap-2">
      <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-3">
          <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

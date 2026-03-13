interface SectionDividerProps {
  label: string;
}

const SectionDivider = ({ label }: SectionDividerProps) => {
  return (
    <div className="bg-muted/50 px-4 py-2">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
};

export default SectionDivider;

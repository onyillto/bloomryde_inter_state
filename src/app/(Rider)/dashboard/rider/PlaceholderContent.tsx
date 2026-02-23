type PlaceholderContentProps = {
  title: string;
};

export default function PlaceholderContent({ title }: PlaceholderContentProps) {
  return (
    <div className="flex items-center justify-center h-96 bg-slate-900/60 border border-dashed border-white/10 rounded-2xl">
      <div className="text-center">
        <h2 className="display-font text-2xl font-bold text-white">{title}</h2>
        <p className="text-slate-400 mt-2">
          Content for this page is coming soon.
        </p>
      </div>
    </div>
  );
}

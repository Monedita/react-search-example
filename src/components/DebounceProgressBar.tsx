export default function DebounceProgressBar({ value }: { value: string }) {
  return (
    <div className="absolute inset-0 -z-10 rounded-full overflow-hidden">
      <div key={value} className="debounce-bar w-full h-full bg-blue-700/50 transition-all" />
    </div>
  );
}
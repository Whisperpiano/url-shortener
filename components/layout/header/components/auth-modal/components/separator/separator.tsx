export default function Separator() {
  return (
    <div className="flex items-center">
      <div className="flex-1 bg-muted-foreground h-0.5 opacity-50"></div>
      <span className="uppercase px-3 py-6 font-mono font-medium text-muted-foreground text-sm">
        or
      </span>
      <div className="flex-1 bg-muted-foreground h-0.5 opacity-50"></div>
    </div>
  );
}

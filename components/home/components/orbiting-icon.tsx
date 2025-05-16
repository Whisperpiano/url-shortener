export function OrbitIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="aspect-square size-11 rounded-full bg-muted-foreground/10 backdrop-blur shadow-md flex items-center justify-center border border-muted-foreground/10">
      <div className="aspect-square size-6 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

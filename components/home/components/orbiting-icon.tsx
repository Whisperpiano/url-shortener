import { cn } from "@/lib/utils";

export interface OrbitIconProps {
  children: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  darkColor: string;
  lightColor: string;
}

export function OrbitIcon({ children, darkColor, lightColor }: OrbitIconProps) {
  return (
    <div
      className={cn(
        "aspect-square size-11 rounded-full backdrop-blur shadow-md flex items-center justify-center border border-muted-foreground/10"
      )}
    >
      <div
        className={`aspect-square size-6 flex items-center justify-center ${darkColor} ${lightColor}`}
      >
        {children}
      </div>
    </div>
  );
}

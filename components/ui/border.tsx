function HorizontalBorder({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-full text-foreground/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x " />
      {children}
      <div className="h-full text-foreground/5 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] z-50 border-x " />
    </>
  );
}

function VerticalBorder({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-[40px] border-b" />
      {children}
      <div className="h-[40px] border-b" />
    </>
  );
}

export { HorizontalBorder, VerticalBorder };

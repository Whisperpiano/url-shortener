import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const LinkCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-4 w-full">
          {/* Favicon Skeleton */}
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />

          <div className="flex-1 space-y-2">
            {/* URL Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            </div>

            {/* Original URL Skeleton */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-muted rounded-full" />
              <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex">
            <div className="h-9 w-20 bg-muted rounded-l-md animate-pulse" />
            <div className="h-9 w-9 bg-muted/80 rounded-r-md animate-pulse" />
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between px-6 py-2">
        {/* Badges Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-muted rounded-md animate-pulse" />
          <div className="h-6 w-24 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Status Badge Skeleton */}
        <div className="h-6 w-16 bg-muted/50 rounded-md animate-pulse" />
      </CardFooter>
    </Card>
  );
};

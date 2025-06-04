import { NumberTicker } from "@/components/magicui/number-ticker";
import { fetchGitHubStats } from "@/lib/actions/github/github-stats";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default async function GitHubStats({ className }: Props) {
  const { stars, contributors, pulls } = await fetchGitHubStats();

  return (
    <section className={cn("flex flex-col sm:flex-row w-full", className)}>
      <div className="flex flex-col items-center justify-center gap-3 min-w-[120px] sm:min-w-[180px] md:min-w-[250px]">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/50 text-transparent bg-clip-text">
          <NumberTicker value={stars} />
          <span>+</span>
        </div>
        <span className="text-muted-foreground text-balance font-medium text-sm uppercase tracking-tighter">
          Github Stars
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 min-w-[120px] sm:min-w-[180px] md:min-w-[250px] border-y-2 sm:border-y-0 sm:border-x-2 my-4 py-4 sm:my-0 sm:py-0">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/50 text-transparent bg-clip-text">
          <NumberTicker value={contributors} />
          <span>+</span>
        </div>
        <span className="text-muted-foreground text-balance font-medium text-sm uppercase tracking-tighter">
          Contributors
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 min-w-[120px] sm:min-w-[180px] md:min-w-[250px]">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/50 text-transparent bg-clip-text">
          <NumberTicker value={pulls} />
          <span>+</span>
        </div>
        <span className="text-muted-foreground text-balance font-medium text-sm uppercase tracking-tighter">
          Pull Requests
        </span>
      </div>
    </section>
  );
}

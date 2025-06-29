import { getLinks } from "@/lib/queries/links";
import CreateLinkForm from "@/components/links/CreateLinkForm";

import LinkCard from "@/components/dashboard/LinkCard";
import DashboardHeader from "@/components/layout/dashboard/components/dashboard-header";
import SearchLinksBar from "@/components/links/search-links-bar";
import SortLinks from "@/components/links/sort-links";
import NoLinksFound from "@/components/links/no-links-found";

export const metadata = {
  title: "Dashboard",
  description: "Your dashboard for Shortleap",
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ search: string; sort: string }>;
}) {
  const { search, sort } = await searchParams;

  const links = await getLinks();

  const filteredLinks = links.filter((link) => {
    if (!search) return true;
    const matchSlug = link.slug.includes(search);
    const matchUrl = link.url.includes(search);
    return matchSlug || matchUrl;
  });

  const sortedLinks = filteredLinks.sort((a, b) => {
    if (sort === "newest") return b.createdAt.getTime() - a.createdAt.getTime();
    if (sort === "oldest") return a.createdAt.getTime() - b.createdAt.getTime();
    if (sort === "clicks-desc") return b.clickCount - a.clickCount;
    if (sort === "clicks-asc") return a.clickCount - b.clickCount;
    return 0;
  });

  return (
    <main className="w-full ">
      <DashboardHeader group="Dashboard" pageTitle="Links" />

      <section className="p-6 max-w-7xl mx-auto animate-fade-in-up">
        {sortedLinks.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex sm:items-center gap-4 flex-1">
              <SearchLinksBar />
              <SortLinks />
            </div>
            <CreateLinkForm />
          </div>
        )}
        <section className="flex flex-col gap-4 mt-6">
          {sortedLinks.length > 0 ? (
            sortedLinks.map((link) => <LinkCard key={link.id} link={link} />)
          ) : (
            <NoLinksFound />
          )}
        </section>
      </section>
    </main>
  );
}

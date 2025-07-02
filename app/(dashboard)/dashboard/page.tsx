import { getLinks } from "@/lib/queries/links";
import { filterLinks } from "@/components/links/utils/filter-links";
import { sortLinks } from "@/components/links/utils/sort-links";

import LinkCard from "@/components/links/link-card/link-card";
import NoLinksFound from "@/components/links/no-links-found/no-links-found";
import DashboardHeader from "@/components/layout/dashboard/components/dashboard-header";
import LinksToolbar from "@/components/links/links-toolbar/links-toolbar";

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

  const filteredLinks = filterLinks(links, search);

  const sortedLinks = sortLinks(filteredLinks, sort);

  return (
    <main className="w-full ">
      <DashboardHeader group="Dashboard" pageTitle="Links" />

      <section className="p-6 max-w-7xl mx-auto animate-fade-in-up">
        {links.length > 0 && <LinksToolbar />}

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

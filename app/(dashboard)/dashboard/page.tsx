import { Button } from "@/components/ui/button";
import { Globe, Plus, SlidersHorizontal } from "lucide-react";
// import { auth } from "../auth";
import { getLinks } from "@/lib/queries/links";
import CreateLinkForm from "@/components/links/CreateLinkForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LinkCard from "@/components/dashboard/LinkCard";
import DashboardHeader from "@/components/layout/dashboard/dashboard-header";
import SearchLinksBar from "@/components/links/search-links-bar";
import SortLinks from "@/components/links/sort-links";

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
    <main className="w-full">
      <DashboardHeader group="Dashboard" pageTitle="Links" />
      <section className="mt-10 px-6 max-w-7xl mx-auto">
        <div className="flex gap-4 items-center">
          <SearchLinksBar />
          <SortLinks />
          <Button variant="outline" size={"default"}>
            <SlidersHorizontal />
            Display
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="cursor-pointer"
                size={"default"}
              >
                Create link
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span className="text-sm">New link</span>
                  </div>
                </DialogTitle>
                <DialogDescription className="relative"></DialogDescription>
                <CreateLinkForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <section className="flex flex-col gap-4 mt-6">
          {sortedLinks.length > 0 ? (
            sortedLinks.map((link) => <LinkCard key={link.id} link={link} />)
          ) : (
            <p>nothing here</p>
          )}
        </section>
      </section>
    </main>
  );
}

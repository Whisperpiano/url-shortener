import { Button } from "@/components/ui/button";
import { ArrowUpDown, Globe, Plus, SlidersHorizontal } from "lucide-react";
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

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;

  console.log(search);

  const links = await getLinks();
  console.log(links);
  // const searchLinks = await searchParams.search;

  // if (Array.isArray(searchLinks)) {
  //   return links;
  // }

  // const filteredLinks = links.filter((link) => {
  //   if (!searchLinks) return true;
  //   const matchSlug = link.slug.includes(searchLinks);
  //   const matchUrl = link.url.includes(searchLinks);
  //   return matchSlug || matchUrl;
  // });

  // console.log(filteredLinks);

  return (
    <main className="w-full">
      <DashboardHeader group="Dashboard" pageTitle="Links" />
      <section className="mt-10 px-6 max-w-7xl mx-auto">
        <div className="flex gap-4 items-center">
          <SearchLinksBar />
          <Button variant="outline" size={"default"}>
            <ArrowUpDown />
            Filter
          </Button>
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

        <section className="flex flex-col mt-6">
          {links.length > 0 ? (
            links.map((link) => <LinkCard key={link.id} link={link} />)
          ) : (
            <p>nothing here</p>
          )}
        </section>
      </section>
    </main>
  );
}

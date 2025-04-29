import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
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

export default async function Dashboard() {
  // const session = await auth();
  const links = await getLinks();

  console.log("LINKS", links);

  return (
    <>
      <DashboardHeader group="Dashboard" pageTitle="Links" />
      <section className="mt-10 px-6">
        <div className="flex gap-4 items-center">
          <Input placeholder="Search..." />
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Display</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Create link</Button>
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

        <section className="flex flex-col">
          {links.length > 0 ? (
            links.map((link) => <LinkCard key={link.id} link={link} />)
          ) : (
            <p>nothing here</p>
          )}
        </section>
      </section>
    </>
  );
}

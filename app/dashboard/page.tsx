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

export default async function Dashboard() {
  // const session = await auth();
  const links = await getLinks();

  return (
    <section className="max-w-7xl mx-auto py-6 px-4">
      <h1>Links</h1>
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

      <section className="flex gap-2">
        {links.length > 0 ? (
          links.map((link) => <LinkCard key={link.id} link={link} />)
        ) : (
          <p>nothing here</p>
        )}
      </section>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

const testLink = {
  id: 1,
  title: "Test link",
  url: "google.com",
  shortUrl: "shortly.link/test",
  createdAt: new Date(),
  views: 100,
  clicks: 100,
  isPublic: true,
  isDeleted: false,
  user: {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    image: "https://avatars.githubusercontent.com/u/123456789?v=4",
  },
  tags: ["tag1", "tag2"],
  description: "This is a test link",
};

export default async function Dashboard() {
  return (
    <section className="max-w-7xl mx-auto py-6 px-4">
      <h1>Links</h1>
      <div className="flex gap-4 items-center">
        <Input placeholder="Search..." />
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Display</Button>
        <Button variant="default">Create link</Button>
      </div>
      <div className="bg-white p-3">
        <QRCodeSVG value={"https://jesusalberola.netlify.app/"} />
      </div>

      <section>
        <article className="border border-muted-foreground/20 rounded-lg p-6 mt-10 flex gap-2 items-center">
          <button
            role="checkbox"
            aria-checked
            className="aspect-square w-10 rounded-full overflow-hidden cursor-pointer group hover:border-ring hover:ring-ring/50 hover:ring-[3px] transition-all duration-200"
          >
            <img src={testLink.user.image} alt={testLink.user.name} />
          </button>
          <div className="flex flex-col ">
            <Link
              href={`/dashboard/links/${testLink.id}`}
              className="font-medium lowercase"
            >
              {testLink.shortUrl}
            </Link>
            <span className="text-xs text-muted-foreground lowercase">
              {testLink.url}
            </span>
          </div>
        </article>
      </section>
    </section>
  );
}

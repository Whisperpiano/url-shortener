import { Link } from "@/lib/zod/links";

export const sortLinks = (links: Link[], sort: string) => {
  return links.sort((a, b) => {
    if (sort === "newest") return b.createdAt.getTime() - a.createdAt.getTime();
    if (sort === "oldest") return a.createdAt.getTime() - b.createdAt.getTime();
    if (sort === "clicks-desc") return b.clickCount - a.clickCount;
    if (sort === "clicks-asc") return a.clickCount - b.clickCount;
    return 0;
  });
};

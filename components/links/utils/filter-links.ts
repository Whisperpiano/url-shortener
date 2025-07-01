import { Link } from "@/lib/zod/links";

export const filterLinks = (links: Link[], search: string) => {
  return links.filter((link) => {
    if (!search) return true;
    const matchSlug = link.slug.includes(search);
    const matchUrl = link.url.includes(search);
    return matchSlug || matchUrl;
  });
};

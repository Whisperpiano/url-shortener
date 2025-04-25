export function getFaviconFromUrl(url: string): string {
  const { hostname } = new URL(url);
  return `https://www.google.com/s2/favicons?sz=128&domain=${hostname}`;
}

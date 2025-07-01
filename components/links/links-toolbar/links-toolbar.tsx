import CreateLinkForm from "./components/create-link-form/create-link-form";
import SearchLinksBar from "./components/search-link-bar/search-links-bar";
import SortLinks from "./components/sort-links/sort-links";

export default function LinksToolbar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex sm:items-center gap-4 flex-1">
        <SearchLinksBar />
        <SortLinks />
      </div>
      <CreateLinkForm />
    </div>
  );
}

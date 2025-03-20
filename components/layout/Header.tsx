import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import ToggleTheme from "./ToggleTheme";

export default function Header() {
  return (
    <header className="max-w-7xl mx-auto p-4 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <h1 className="font-mono tracking-widest font-medium text-base">
          Shortly
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <SearchBar />
        <ToggleTheme />
        <Button variant={"default"} className="cursor-pointer">
          Sign in
        </Button>
      </div>
    </header>
  );
}

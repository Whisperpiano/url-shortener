import NavBar from "./components/nav-bar/nav-bar";
import Logo from "./components/logo/logo";

export default async function Header() {
  return (
    <header className="bg-background/5 backdrop-blur border-b">
      <div className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px]">
        <div className="border-x" />
        <div className="flex items-center justify-between p-6">
          <Logo />
          <NavBar />
        </div>
        <div className="border-x" />
      </div>
    </header>
  );
}

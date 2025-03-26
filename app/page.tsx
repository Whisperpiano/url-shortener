"use server";

import { auth } from "@/app/auth";
import Login from "@/components/layout/Login";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);

  if (session?.user) {
    return (
      <>
        <h1>Welcome back {session.user.name}</h1>
        <Button variant={"default"} className="cursor-pointer" onClick={logout}>
          Logout
        </Button>
      </>
    );
  }
  return (
    <>
      <main className="max-w-7xl mx-auto px-4">
        <section className="text-center relative h-full w-full py-32">
          <h2 className="font-mono font-semibold text-5xl">
            Shorten your links{" "}
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              fast
            </span>
            <span> and </span>
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              easy
            </span>
          </h2>
          <p className="text-lg text-muted-foreground pt-3 pb-6">
            Transform long, messy URLs into short and shareable links in
            seconds. Start simplifying your links today!
          </p>

          <Login btnText="Get started" />
        </section>
      </main>
    </>
  );
}

"use server";

import { auth } from "@/app/auth";
import Login from "@/components/layout/Login";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return <h1>Welcome back {session.user.name}</h1>;
  }
  return (
    <>
      <main className="max-w-7xl mx-auto px-4">
        <h2 className="font-mono font-semibold text-3xl ">
          Shorten your links{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            fast
          </span>
          <span> and </span>
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
            easy
          </span>
        </h2>
        <p>
          Transform long, messy URLs into short and shareable links in seconds.
          Start simplifying your links today!
        </p>

        <Login btnText="Get started" />

        {/* <LoginButton /> */}
      </main>
    </>
  );
}

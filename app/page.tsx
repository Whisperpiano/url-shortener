import AuthModal from "@/components/header/AuthModal";

export default async function Home() {
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

          <AuthModal btnText="Get Started" />
        </section>
      </main>
    </>
  );
}

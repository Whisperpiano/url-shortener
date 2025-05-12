import {
  Link as LinkIcon,
  PencilLine,
  BarChart3,
  QrCode,
  Hourglass,
  Github,
} from "lucide-react";

const features = [
  {
    title: "URL Shortening",
    description:
      "Transform long, messy links into clean, short URLs in a single click.",
    icon: LinkIcon,
  },
  {
    title: "Custom Slugs",
    description:
      "Choose your own short link endings to make your URLs memorable and brand-friendly.",
    icon: PencilLine,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track clicks, referrers, geolocation data, and performance over time with a simple, clear dashboard.",
    icon: BarChart3,
  },
  {
    title: "QR Code Generator",
    description:
      "Generate scannable QR codes for any shortened link, ready to share in print or digitally.",
    icon: QrCode,
  },
  {
    title: "Link Expiration",
    description:
      "Set expiration dates or click limits to automatically deactivate links after a period of time.",
    icon: Hourglass,
  },
  {
    title: "Open Source & Self-Hostable",
    description:
      "Fully open source on GitHub — deploy it yourself or contribute to the project and help shape its future.",
    icon: Github,
  },
];

export default function FeaturesSection() {
  return (
    <section className="my-30 border p-4 ">
      <h2 className="text-4xl font-bold text-center mb-12">
        Powerful features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide border ">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative flex items-center gap-8 py-16 px-8 transition duration-300 hover:outline hover:outline-offset-[-1px] hover:outline-violet-500/75 overflow-hidden"
            >
              <div className=" aspect-square size-20 grid place-content-center rounded-lg bg-background border-2 border-purple-500/25 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ">
                <Icon className="size-8 text-violet-500 transition duration-300 group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,1)]" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-violet-400">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-zinc-300">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 -z-1 h-full w-full bg-background bg-[linear-gradient(to_right,#4f4f4f36_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:2rem_2rem] mask-r-from-1% mask-b-to-100% transition-opacity duration-500 group-hover:opacity-80" />

              <div className="absolute aspect-square rounded-full size-30 blur-3xl bg-purple-500/50 -right-14 -bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     {features.map((feature) => {
//       const Icon = feature.icon;
//       return (
//         <div
//           key={feature.title}
//           className="group relative rounded-xl overflow-hidden p-6 backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
//         >
//           <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white mb-4 shadow-lg">
//             <Icon className="w-7 h-7" />
//           </div>

//           <div className="relative z-10 mt-2">
//             <h3 className="text-lg font-semibold text-white">
//               {feature.title}
//             </h3>
//             <p className="text-sm text-gray-300 mt-1">
//               {feature.description}
//             </p>
//           </div>

//           {/* Efecto de fondo con gradiente radial */}
//           <div className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-violet-500/10 via-transparent to-indigo-500/10"></div>

//           {/* Decoración geométrica (opcional) */}
//           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-violet-500/10 rounded-full blur-xl transform rotate-12 scale-75 opacity-30 group-hover:scale-100 transition-transform duration-500"></div>
//         </div>
//       );
//     })}
//   </div>

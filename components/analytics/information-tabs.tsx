"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getFlag } from "@/lib/utils/getFlag";

const tabs = [
  { id: "country", label: "Country" },
  { id: "region", label: "Region" },
  { id: "city", label: "City" },
];

type InformationTabsProps = {
  countryChart: Array<{ country: string; value: number; countryCode: string }>;
  regionChart: Array<{ region: string; value: number; countryCode: string }>;
  cityChart: Array<{ city: string; value: number; countryCode: string }>;
};

export default function InformationTabs({
  countryChart,
  regionChart,
  cityChart,
}: InformationTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const total = countryChart.reduce((acc, item) => acc + item.value, 0);

  console.log("countryChart", countryChart);
  console.log("regionChart", regionChart);
  console.log("cityChart", cityChart);

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-muted-foreground pb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-2 cursor-pointer "
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute -bottom-5 left-0 right-0 w-full h-0.5 bg-muted-foreground "
              ></motion.div>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {countryChart.map((item) => {
          const percentage = (item.value / total) * 100;

          return (
            <div
              key={item.country}
              className="relative overflow-hidden group cursor-pointer hover:bg-muted/50 rounded-s-sm rounded-e-sm transition-colors hover:rounded-s-none"
            >
              {/* Fondo proporcional */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent z-0 rounded-e-sm group-hover:bg-accent/90 transition-colors"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${percentage}%`, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              <div className="absolute h-full w-0 bg-red-500 left-0 group-hover:w-0.5 "></div>

              <div className="relative z-10 flex items-center justify-between py-2 px-3">
                <div className="flex items-center gap-2">
                  <img
                    src={getFlag(item.countryCode)}
                    alt={item.country}
                    className="w-6 h-4"
                  />
                  <span className="text-sm font-normal">{item.country}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-normal text-right translate-x-10 group-hover:translate-x-0 transition-transform">
                  {item.value}
                  <span className="text-xs text-muted-foreground min-w-8">
                    {percentage.toFixed()}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

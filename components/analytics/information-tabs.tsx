"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getFlag } from "@/lib/utils/getFlag";
import { FaQuestionCircle } from "react-icons/fa";
import { browserIcons, deviceIcons, osIcons } from "../icons/icons-dictionary";
import { capitalizeFirstLetter } from "@/lib/utils/capitalizeFirstLetter";

type AggregatedItem = {
  label: string;
  value: number;
  countryCode?: string;
};

type LocationData = {
  type: "location";
  data: {
    Country: AggregatedItem[];
    Region: AggregatedItem[];
    City: AggregatedItem[];
  };
};

type DeviceData = {
  type: "device";
  data: {
    Device: AggregatedItem[];
    Browser: AggregatedItem[];
    OS: AggregatedItem[];
  };
};

type DataType = LocationData | DeviceData;

export default function InformationTabs({
  data: { type, data },
}: {
  data: DataType;
}) {
  const [activeTab, setActiveTab] = useState<string>(
    type === "location" ? "Country" : "Device"
  );

  const activeData =
    type === "location"
      ? (data as LocationData["data"])[activeTab as keyof LocationData["data"]]
      : (data as DeviceData["data"])[activeTab as keyof DeviceData["data"]];

  const total = activeData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-muted-foreground pb-5">
        {Object.entries(data).map(([label]) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className="relative px-2 cursor-pointer "
          >
            {label}
            {activeTab === label && (
              <motion.div
                key={label}
                layoutId={`active-pill-${type}`}
                className="absolute -bottom-5 left-0 right-0 w-full h-0.5 bg-muted-foreground "
              ></motion.div>
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {activeData.map((item) => {
          const percentage = (item.value / total) * 100;

          return (
            <div
              key={item.label}
              className="relative overflow-hidden group cursor-pointer hover:bg-muted/50 rounded-s-sm rounded-e-sm transition-colors hover:rounded-s-none"
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-accent z-0 rounded-e-sm group-hover:bg-accent/90 transition-colors"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${percentage}%`, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              <div className="absolute h-full w-0 bg-red-500 left-0 group-hover:w-0.5 "></div>

              <div className="relative z-10 flex items-center justify-between py-2 px-3">
                <div className="flex items-center gap-2">
                  {type === "location" && item.countryCode && (
                    <img
                      src={getFlag(item.countryCode)}
                      alt={item.countryCode}
                      className="w-6 h-4"
                    />
                  )}

                  {(type === "device" &&
                    activeTab === "Device" &&
                    deviceIcons[item.label]) ?? <FaQuestionCircle />}

                  {(type === "device" &&
                    activeTab === "Browser" &&
                    browserIcons[item.label]) ?? <FaQuestionCircle />}

                  {(type === "device" &&
                    activeTab === "OS" &&
                    osIcons[item.label]) ?? <FaQuestionCircle />}

                  <span className="text-sm font-normal">
                    {capitalizeFirstLetter(item.label)}
                  </span>
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

      {/* {tabs.map((tab) => (
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
        ))} */}
    </div>
  );
}

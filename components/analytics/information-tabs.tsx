"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getFlag } from "@/lib/utils/getFlag";
import { FaQuestionCircle } from "react-icons/fa";
import { browserIcons, deviceIcons, osIcons } from "../icons/icons-dictionary";
import { capitalizeFirstLetter } from "@/lib/utils/capitalizeFirstLetter";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Scan } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <>
      <Card className="min-h-[300px] flex flex-col gap-0 py-0">
        <CardHeader className="border-b border-muted-foreground/20 [.border-b]:pb-0 gap-0 px-4">
          <CardTitle className="flex items-center gap-3 py-4 text-sm">
            {Object.entries(data).map(([label]) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={cn(
                  "relative px-2 cursor-pointer text-accent-foreground/50 font-medium hover:text-accent-foreground transition-colors",
                  activeTab === label && "text-accent-foreground"
                )}
              >
                {label}
                {activeTab === label && (
                  <motion.div
                    key={label}
                    layoutId={`active-pill-${type}`}
                    className="absolute -bottom-4 left-0 right-0 w-full h-0.5 bg-muted-foreground "
                  ></motion.div>
                )}
              </button>
            ))}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col px-0 overflow-hidden flex-1 justify-between">
          <ul className="flex flex-col border-t">
            {activeData.map((item) => {
              const percentage = (item.value / total) * 100;

              return (
                <li
                  key={item.label}
                  className="group cursor-pointer hover:bg-muted/50 rounded-none transition-colors p-4 flex flex-col gap-3 border-b"
                >
                  <div className="flex items-center justify-between">
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

                    <div className="flex items-center gap-2 text-sm font-normal text-right translate-x group-hover:translate-x-0 transition-transform relative group ">
                      <span className=" group-hover:-translate-x-10 transition-transform ">
                        {item.value}
                      </span>
                      <span className="absolute -right-12 text-xs text-muted-foreground min-w-8  group-hover:-translate-x-10 transition-transform ">
                        {percentage.toFixed()}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-primary/20 relative h-1.5 w-full overflow-hidden rounded-full">
                    <motion.div
                      className={`relative h-2 w-full overflow-hidden rounded-full ${
                        type === "device"
                          ? "bg-[var(--color-chart-2)]"
                          : "bg-[var(--color-chart-2)]"
                      }`}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: `${percentage}%`, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-muted-foreground/20 p-4 cursor-pointer hover:bg-muted/50 flex items-center justify-center gap-2 transition-colors">
            <Scan size={14} />
            <span className="text-sm font-normal">Details</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

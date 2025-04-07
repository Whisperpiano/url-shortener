"use client";

import { QRCodeSVG } from "qrcode.react";
import PixelCanvas from "./PixelCanvas";
import { useState } from "react";
import { Check } from "lucide-react";

const presetColors = [
  "#C0392B",
  "#DF6547",
  "#ee80c0",
  "#dbb61f",
  "#57A773",
  "#3058A6",
  "#B04CC0",
];

export default function QRComponent() {
  const [selectedColor, setSelectedColor] = useState("#DF6547");

  return (
    <>
      <span className="text-sm text-muted-foreground">QR Code Preview</span>
      <div className="relative rounded-sm overflow-hidden border border-muted-foreground/50 p-12 bg-radial from-background to-transparent">
        <PixelCanvas
          gap={6}
          speed={0.1}
          className="opacity-100 absolute inset-0 w-full h-full -z-10 rounded-sm pl-1.5 pr-1 pt-1.5 pb-1"
        />
        <div className="flex justify-center items-center size-full ">
          <QRCodeSVG
            value="https://www.google.com"
            size={140}
            level="Q"
            fgColor={selectedColor}
            className="p-2 bg-white rounded-sm "
          />
        </div>
      </div>
      <span className="text-sm text-muted-foreground">QR Code Color</span>
      <div className="flex items-center space-x-2">
        <div
          className="flex border-2 rounded overflow-hidden shadow-sm shadow-muted-foreground/20"
          style={{ borderColor: selectedColor }}
        >
          <div
            className="aspect-square w-8 border-r border-muted"
            style={{ backgroundColor: selectedColor }}
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => {
              let value = e.target.value;

              if (!value.startsWith("#")) {
                value = "#" + value.replace(/^#+/, "");
              }

              value = value.slice(0, 7).replace(/[^#0-9a-fA-F]/g, "");
              setSelectedColor(value);
            }}
            className="w-[90px] px-2 py-1 text-sm outline-none border-none"
          />
        </div>

        {presetColors.map((color) => {
          const isSelected =
            color.toLowerCase() === selectedColor.toLowerCase();
          return (
            <button
              key={color}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 ring-offset-2 ring-muted-foreground cursor-pointer ${
                isSelected ? "ring-1 " : "ring-none"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            >
              {isSelected && <Check size={14} className="text-white" />}
            </button>
          );
        })}
      </div>
    </>
  );
}

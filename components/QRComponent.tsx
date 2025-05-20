"use client";

import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import PixelCanvas from "./PixelCanvas";
import { useEffect, useRef, useState } from "react";
import { Check, ImageIcon } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

const presetColors = [
  "#000000",
  "#C0392B",
  "#DF6547",
  "#ee80c0",
  "#dbb61f",
  "#57A773",
  "#3058A6",
  "#B04CC0",
];

export default function QRComponent({ url }: { url: string }) {
  const [selectedColor, setSelectedColor] = useState("#DF6547");
  const [isChangingColor, setIsChangingColor] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const pngRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setSelectedColor("#000000");
  }, []);

  const handleDownloadSVG = () => {
    const svg = svgRef.current;
    if (!svg) {
      toast.error("Failed to generate QR code");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "qr-code.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    const png = pngRef.current;
    if (!png) {
      toast.error("Failed to generate QR code");
      return;
    }

    const pngDataUrl = png.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngDataUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <span className="text-sm text-muted-foreground">QR Code Preview</span>
      <div className="relative rounded-sm overflow-hidden border border-muted-foreground/50 p-12 bg-radial from-background to-transparent">
        <PixelCanvas
          gap={6}
          speed={0.1}
          className="opacity-100 absolute inset-0 w-full h-full -z-10 rounded-sm pl-1.5 pr-1 pt-1.5 pb-1"
        />
        <div
          className={`flex justify-center items-center size-full transition-all ${
            isChangingColor ? "blur-[2px] opacity-50" : "blur-none opacity-100"
          }`}
        >
          <QRCodeSVG
            value={url}
            size={140}
            ref={svgRef}
            level="Q"
            fgColor={selectedColor}
            className="p-2 bg-white rounded-sm"
          />
          <QRCodeCanvas
            value={url}
            size={140}
            ref={pngRef}
            level="Q"
            fgColor={selectedColor}
            className="p-2 bg-white rounded-sm hidden"
          />
        </div>
      </div>
      <span className="text-sm text-muted-foreground">QR Code Color</span>
      <div className="flex items-center space-x-2">
        <div
          className="flex border-2 rounded overflow-hidden shadow-sm shadow-muted-foreground/50"
          style={{ borderColor: selectedColor }}
        >
          <label
            className="aspect-square w-8 border-r border-muted"
            htmlFor="color"
            style={{ backgroundColor: selectedColor }}
          />

          <input
            type="text"
            id="color"
            value={selectedColor}
            disabled={isChangingColor}
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
        <div className="ml-4 flex flex-wrap gap-3">
          {presetColors.map((color) => {
            const isSelected =
              color.toLowerCase() === selectedColor.toLowerCase();
            return (
              <button
                key={color}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 ring-offset-2 ring-muted-foreground cursor-pointer border-2 border-muted-foreground/50  ${
                  isSelected ? "ring-1" : "ring-none"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setIsChangingColor(true);
                  setTimeout(() => {
                    setSelectedColor(color);
                    setIsChangingColor(false);
                  }, 150);
                }}
              >
                {isSelected && <Check size={14} className="text-white" />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <DialogClose asChild>
          <Button variant="outline" className="py-5 cursor-pointer">
            Cancel
          </Button>
        </DialogClose>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="cursor-pointer">
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-foreground/5"
              onClick={handleDownloadSVG}
            >
              <ImageIcon />
              SVG
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-foreground/5"
              onClick={handleDownloadPNG}
            >
              <ImageIcon />
              PNG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

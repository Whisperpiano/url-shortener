"use client";

import { Button } from "@/components/ui/button";
import { CSVDataTypes } from "@/lib/queries/charts";
import Papa from "papaparse";

export function DownloadCSVButton({ data }: { data: CSVDataTypes[] }) {
  const handleDownload = () => {
    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="default"
      className="cursor-pointer py-5 @[650px]:w-fit w-full"
      onClick={handleDownload}
    >
      Download as CSV
    </Button>
  );
}

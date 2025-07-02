import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

import QRComponent from "@/components/QRComponent";

interface Props {
  url: string;
}

export default function LinkQrDesktop({ url }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="text-xs rounded-r-none cursor-pointer sm:flex hidden"
        >
          <QrCode />
          <span className="lg:block hidden">QR code</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription className="relative"></DialogDescription>
        </DialogHeader>
        <QRComponent url={url} />
      </DialogContent>
    </Dialog>
  );
}

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

import QRComponent from "@/components/QRComponent";

interface Props {
  url: string;
}

export default function LinkQrMobile({ url }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="text-xs rounded-r-none cursor-pointer sm:hidden flex"
        >
          <QrCode />
          <span className="lg:block hidden">QR code</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <DrawerHeader className="sr-only">
          <DrawerTitle />
          <DrawerDescription className="relative" />
        </DrawerHeader>

        <div className="px-4">
          <QRComponent url={url} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

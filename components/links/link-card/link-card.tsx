"use client";

import { Link as LinkType } from "@/lib/zod/links";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { MagicCard } from "../../special/magic-card";
import { useState } from "react";

import LinkFavicon from "./components/link-favicon/link-favicon";
import LinkInfo from "./components/link-info/link-info";
import LinkQrButtons from "./components/link-qr-buttons/link-qr-buttons";
import LinkActionsDropdown from "./components/link-actions-dropdown/link-actions-dropdown";
import LinkStats from "./components/link-stats/link-stats";
import LinkStatusBadge from "./components/link-status-badge/link-status-badge";
import DeleteLinkDialog from "./components/delete-link-dialog/delete-link-dialog";

interface LinkCardProps {
  link: LinkType;
}

export default function LinkCard({ link }: LinkCardProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <MagicCard className="rounded-xl ">
      <Card>
        <CardContent className="flex items-center justify-between ">
          <div className="flex items-center gap-4 min-w-0 flex-1 overflow-hidden">
            <LinkFavicon url={link.url} />

            <LinkInfo link={link} />
          </div>

          <div className="flex items-center justify-end ml-5">
            <LinkQrButtons url={link.url} />

            <LinkActionsDropdown
              slug={link.slug}
              setOpenDeleteDialog={setOpenDeleteDialog}
            />
          </div>
        </CardContent>

        <Separator />
        <CardFooter className="flex justify-between items-center">
          <LinkStats count={link.clickCount} createdAt={link.createdAt} />
          <LinkStatusBadge />
        </CardFooter>
      </Card>

      <DeleteLinkDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        link={link}
      />
    </MagicCard>
  );
}

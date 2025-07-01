"use client";
import { useState } from "react";
import { useCreateLink } from "@/lib/hooks/forms/useCreateLink";

import CreateLinkFormDesktop from "./components/create-link-form-desktop/create-link-form-desktop";
import CreateLinkFormMobile from "./components/create-link-form-mobile/create-link-form-mobile";

export default function CreateLinkForm() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const formProps = useCreateLink(setDialogOpen, setDrawerOpen);

  return (
    <>
      <CreateLinkFormDesktop
        open={dialogOpen}
        setOpen={setDialogOpen}
        formProps={{ ...formProps }}
      />

      <CreateLinkFormMobile
        open={drawerOpen}
        setOpen={setDrawerOpen}
        formProps={{ ...formProps }}
      />
    </>
  );
}

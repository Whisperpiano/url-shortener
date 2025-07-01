import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UseCreateLinkType } from "@/lib/hooks/forms/useCreateLink";
import { ArrowLeft } from "lucide-react";

import LinkFormFields from "./components/link-form-fields/link-form-fields";
import LinkFormAdvanced from "./components/link-form-advanced/link-form-advanced";

interface Props {
  formProps: UseCreateLinkType;
}

export default function LinkFormContent({ formProps }: Props) {
  const { handleSubmit, onSubmit, isGeneratingSlug } = formProps;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <LinkFormFields formProps={formProps} />
      <LinkFormAdvanced formProps={formProps} />
      <Separator />
      <div className="flex gap-2 items-center justify-between">
        <DialogClose asChild>
          <Button
            variant="outline"
            className="py-5 cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft />
            Go back
          </Button>
        </DialogClose>
        <Button
          type="submit"
          variant="default"
          className="cursor-pointer"
          disabled={isGeneratingSlug}
        >
          Create link
        </Button>
      </div>
    </form>
  );
}

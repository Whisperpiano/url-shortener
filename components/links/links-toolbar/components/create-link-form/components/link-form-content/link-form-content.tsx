import { Separator } from "@/components/ui/separator";
import { UseCreateLinkType } from "@/lib/hooks/forms/useCreateLink";

import LinkFormFields from "./components/link-form-fields/link-form-fields";
import LinkFormAdvanced from "./components/link-form-advanced/link-form-advanced";
import LinkFormActionButtons from "./components/link-form-action-buttons/link-form-action-buttons";

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
      <LinkFormActionButtons isGeneratingSlug={isGeneratingSlug} />
    </form>
  );
}

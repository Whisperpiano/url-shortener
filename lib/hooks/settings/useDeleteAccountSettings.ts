import {
  DeleteAccountSettingsSchema,
  DeleteAccountSettingsTypes,
} from "@/lib/zod/settings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccount } from "@/lib/actions/account/delete-account";
import { toast } from "sonner";
import { logout } from "@/lib/actions/auth/logout";
import { useState } from "react";

interface UseDeleteAccountSettings {
  userID?: string;
}

export const useDeleteAccountSettings = ({
  userID,
}: UseDeleteAccountSettings) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccountSettingsTypes>({
    resolver: zodResolver(DeleteAccountSettingsSchema),
  });

  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmit = async (data: DeleteAccountSettingsTypes) => {
    if (!userID) {
      return;
    }

    setIsDeleting(true);
    const confirmed = data.confirmation === "confirm delete account";

    if (!confirmed) {
      return;
    }
    const { success, message } = await deleteAccount(userID);

    if (success) {
      toast.success(message);
      await logout();
    } else {
      toast.error(message);
      setIsDeleting(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isDeleting,
    errors,
  };
};

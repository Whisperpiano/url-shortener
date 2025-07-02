import { useState } from "react";
import { useCloudinaryUpload } from "@/lib/hooks/cloudinary/useCloudinaryUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarSettingsSchema, AvatarSettingsTypes } from "@/lib/zod/settings";
import { updateAvatar } from "@/lib/actions/account/update-avatar";
import { toast } from "sonner";

export const useAvatarSettings = (userAvatar: string) => {
  const [currentAvatar, setCurrentAvatar] = useState(userAvatar);

  const { imageUrl, isUploading, handleFileChange, resetImageUrl } =
    useCloudinaryUpload();
  const { register, handleSubmit, setValue } = useForm<AvatarSettingsTypes>({
    resolver: zodResolver(AvatarSettingsSchema),
    defaultValues: {
      avatarUrl: currentAvatar,
    },
  });

  const onSubmit = async (data: AvatarSettingsTypes) => {
    try {
      setValue("avatarUrl", data.avatarUrl);

      if (!imageUrl) {
        throw new Error("No image URL found");
      }

      const { success, error } = await updateAvatar(imageUrl);

      if (!success || error) {
        setValue("avatarUrl", imageUrl);
        throw new Error(error);
      }

      setCurrentAvatar(imageUrl);
      resetImageUrl();

      toast.success("Avatar updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Your changes have been reverted.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isUploading,
    handleFileChange,
    resetImageUrl,
    currentAvatar,
    setCurrentAvatar,
    imageUrl,
  };
};

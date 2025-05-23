"use client";

import Image from "next/image";
import { CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { CloudUpload, Save } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

import { useCloudinaryUpload } from "@/lib/hooks/cloudinary/useCloudinaryUpload";
import { Spinner } from "../ui/spinner";
import { AvatarSettingsSchema, AvatarSettingsTypes } from "@/lib/zod/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateAvatar } from "@/lib/actions/account/update-avatar";

export default function AvatarSettings({ userAvatar }: { userAvatar: string }) {
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

  const displayAvatar = imageUrl || currentAvatar;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div>
            <Label
              htmlFor="picture"
              className="relative inline-flex border-2 border-muted-foreground/20 rounded-full aspect-square group cursor-pointer overflow-hidden size-14 mb-6"
            >
              {isUploading ? (
                <Spinner
                  className="absolute inset-0 m-auto flex items-center justify-center"
                  size={16}
                />
              ) : (
                <>
                  <Image
                    src={displayAvatar}
                    alt="Profile picture"
                    width={54}
                    height={54}
                    className="rounded-full object-cover group-hover:opacity-0 transition "
                  />
                  <CloudUpload
                    size={16}
                    className="absolute inset-0 m-auto opacity-0 transition group-hover:opacity-100"
                  />
                </>
              )}
            </Label>
            <Input
              {...register("avatarUrl")}
              id="picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-muted-foreground/20">
          <span className="text-sm text-muted-foreground">
            Square image recommended. Accepted file types: .png, .jpg. Max file
            size: 2MB.
          </span>
          <Button
            variant="outline"
            disabled={isUploading || !imageUrl}
            className="cursor-pointer"
          >
            <Save />
            Save changes
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

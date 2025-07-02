"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CloudUpload, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAvatarSettings } from "@/lib/hooks/settings/useAvatarSettings";

import Image from "next/image";

export default function AvatarSettings({ userAvatar }: { userAvatar: string }) {
  const {
    register,
    handleSubmit,
    onSubmit,
    isUploading,
    handleFileChange,
    currentAvatar,
    imageUrl,
  } = useAvatarSettings(userAvatar);

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
          <span className="text-xs sm:text-sm text-muted-foreground">
            Square image recommended. Accepted file types: .png, .jpg. Max file
            size: 2MB.
          </span>
          <Button
            variant="outline"
            disabled={isUploading || !imageUrl}
            className="cursor-pointer ml-6"
          >
            <Save />
            Save
            <span className="sm:block hidden"> changes</span>
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

"use client";

import { useState } from "react";

export function useCloudinaryUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = { timestamp, folder: "avatars" };

    const response = await fetch("/api/cloudinary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign }),
    });

    if (!response.ok) {
      const error = await response.json();
      setError(`Error generating signature: ${error.error}`);
      setIsUploading(false);
      return;
    }

    const { signature } = await response.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
    formData.append("folder", "avatars");

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!uploadRes.ok) {
      const error = await uploadRes.json();
      setError(`Error uploading image to Cloudinary: ${error.error}`);
      setIsUploading(false);
      return;
    }

    const uploadData = await uploadRes.json();
    setImageUrl(uploadData.secure_url);
    setIsUploading(false);
  };

  return { imageUrl, isUploading, handleFileChange, error };
}

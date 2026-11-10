"use server";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
    secure: true,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export const uploadFile = async (name: string, data: string): Promise<string> => {
  const cleanName = name.replace(/^\/+/, "");
  const publicId = cleanName.replace(/\.[^/.]+$/, "");

  const result = await cloudinary.uploader.upload(data, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });

  return result.secure_url;
};

export const deleteFile = async (url: string): Promise<void> => {
  if (!url) return;
  try {
    if (url.includes("firebasestorage.googleapis.com")) return;

    let publicId = url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.[^/.]*)?$/);
      if (match) {
        publicId = match[1];
      } else {
        return;
      }
    }

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete file from Cloudinary:", error);
  }
};

export const getFile = async (fileName: string): Promise<string> => {
  if (!fileName) return "";
  if (fileName.startsWith("http://") || fileName.startsWith("https://") || fileName.startsWith("/")) {
    return fileName;
  }

  const cleanName = fileName.replace(/^\/+/, "");

  // Nếu file có sẵn trong thư mục public/ (ví dụ public/static/...)
  const localPublicPath = path.join(process.cwd(), "public", cleanName);
  if (fs.existsSync(localPublicPath)) {
    return `/${cleanName}`;
  }

  // Ngược lại lấy từ Cloudinary
  return cloudinary.url(cleanName, { secure: true });
};

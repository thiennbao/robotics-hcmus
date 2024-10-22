import { getFile } from "@/lib/storage";
import Image, { ImageProps } from "next/image";

const FirebaseImage = async ({
  fileName,
  alt,
  ...props
}: { fileName: string; alt: string } & Omit<ImageProps, "src" | "alt">) => {
  const url = await getFile(fileName);
  return <Image src={url} alt={alt} {...props} />;
};

export default FirebaseImage;

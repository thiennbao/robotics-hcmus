import { getFile } from "@/lib/storage";
import Image, { ImageProps } from "next/image";

const FirebaseImage = async ({ fileName, ...props }: { fileName: string } & Omit<ImageProps, "src">) => {
  const url = await getFile(fileName);
  return <Image src={url} {...props} />;
};

export default FirebaseImage;

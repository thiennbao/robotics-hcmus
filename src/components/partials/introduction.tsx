import { getPageConfig } from "@/lib/pageConfig";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { RichTextContent } from "../utils/richTextContent";

const Introduction = async ({
  content,
  ...props
}: { content?: string } & HTMLAttributes<HTMLDivElement>) => {
  const html = content ?? (await getPageConfig("about")).content;

  return (
    <section {...props}>
      <div className="container">
        <RichTextContent
          html={html}
          className={clsx(
            "max-w-4xl mx-auto leading-relaxed text-gray-800 space-y-4",
            "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-primary [&_h1]:mt-6 [&_h1]:mb-3",
            "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-6 [&_h2]:mb-2",
            "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
            "[&_p]:text-base [&_p]:leading-7",
            "[&_a]:text-primary [&_a]:underline",
            "[&_ol]:list-decimal [&_ol]:pl-8",
            "[&_ul]:list-disc [&_ul]:pl-8",
            "[&_.ql-align-center]:text-center",
            "[&_.ql-align-right]:text-right",
            "[&_.ql-align-justify]:text-justify"
          )}
        />
      </div>
    </section>
  );
};

export default Introduction;

import type QuillType from "quill";

export interface ImageFigureValue {
  src: string;
  alt?: string;
  caption?: string;
}

let registered = false;

export const registerImageFigureBlot = (Quill: typeof QuillType) => {
  if (registered || typeof window === "undefined") return;

  const BlockEmbed = Quill.import("blots/block/embed") as {
    new (): any;
    create(value?: unknown): HTMLElement;
    blotName: string;
    tagName: string;
    className?: string;
  };

  class ImageFigureBlot extends BlockEmbed {
    static blotName = "image";
    static tagName = "FIGURE";
    static className = "ql-image-figure";

    static create(value: string | ImageFigureValue) {
      const node = super.create() as HTMLElement;
      const data: ImageFigureValue =
        typeof value === "string" ? { src: value, alt: "", caption: "" } : value;

      const src = data?.src || "";
      const alt = data?.alt || "";
      const caption = data?.caption || "";

      node.setAttribute("contenteditable", "false");
      node.setAttribute("data-caption", caption);

      const card = document.createElement("div");
      card.className = "ql-image-card";

      const img = document.createElement("img");
      img.setAttribute("src", src);
      img.setAttribute("alt", alt);

      const input = document.createElement("input");
      input.type = "text";
      input.className = "ql-image-caption-input";
      input.placeholder = "Thêm mô tả cho hình ảnh (không bắt buộc)...";
      input.value = caption;
      input.setAttribute("value", caption);
      input.setAttribute("aria-label", "Mô tả hình ảnh");

      const mirror = document.createElement("figcaption");
      mirror.className = "ql-image-caption-mirror";
      mirror.textContent = caption;

      const stopEvent = (event: Event) => event.stopPropagation();
      input.addEventListener("mousedown", stopEvent);
      input.addEventListener("click", stopEvent);
      input.addEventListener("keydown", stopEvent);
      input.addEventListener("input", () => {
        input.setAttribute("value", input.value);
        node.setAttribute("data-caption", input.value);
        node.dispatchEvent(new CustomEvent("ql-image-caption-change", { bubbles: true }));
      });

      card.appendChild(img);
      card.appendChild(input);
      card.appendChild(mirror);
      node.appendChild(card);

      return node;
    }

    static value(node: HTMLElement): ImageFigureValue {
      const img = node.querySelector("img");
      const input = node.querySelector<HTMLInputElement>("input.ql-image-caption-input");
      const figcaption = node.querySelector("figcaption");
      const caption =
        input?.value ||
        input?.getAttribute("value") ||
        figcaption?.textContent ||
        node.getAttribute("data-caption") ||
        "";

      return {
        src: img?.getAttribute("src") || "",
        alt: img?.getAttribute("alt") || "",
        caption,
      };
    }
  }

  Quill.register(ImageFigureBlot as any, true);
  registered = true;
};

const normalizeFigureContainer = (root: ParentNode, liveCaptions?: string[]) => {
  const figures = root.querySelectorAll("figure.ql-image-figure");
  figures.forEach((figure, index) => {
    const img = figure.querySelector("img");
    if (!img) {
      figure.remove();
      return;
    }

    const input = figure.querySelector<HTMLInputElement>("input.ql-image-caption-input");
    const figcaption = figure.querySelector("figcaption");
    const caption = (
      liveCaptions?.[index] ??
      (input?.value ||
        input?.getAttribute("value") ||
        figcaption?.textContent ||
        figure.getAttribute("data-caption") ||
        "")
    ).trim();

    const cleanImg = document.createElement("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || "";
    if (src) cleanImg.setAttribute("src", src);
    cleanImg.setAttribute("alt", alt);

    figure.removeAttribute("contenteditable");
    figure.removeAttribute("data-caption");
    figure.innerHTML = "";
    figure.appendChild(cleanImg);

    if (caption) {
      const cleanCaption = document.createElement("figcaption");
      cleanCaption.textContent = caption;
      figure.appendChild(cleanCaption);
    }
  });
};

export const cleanEditorElement = (editorEl: Element): string => {
  const liveFigures = editorEl.querySelectorAll("figure.ql-image-figure");
  const liveCaptions = Array.from(liveFigures).map((figure) => {
    const input = figure.querySelector<HTMLInputElement>("input.ql-image-caption-input");
    const figcaption = figure.querySelector("figcaption");
    return (
      input?.value ||
      input?.getAttribute("value") ||
      figcaption?.textContent ||
      figure.getAttribute("data-caption") ||
      ""
    );
  });

  const clone = editorEl.cloneNode(true) as HTMLElement;
  normalizeFigureContainer(clone, liveCaptions);

  const result = clone.innerHTML.trim();
  return result === "<p><br></p>" ? "" : result;
};

export const cleanEditorHtml = (html: string): string => {
  const trimmed = html.trim();
  if (!trimmed || trimmed === "<p><br></p>") return "";
  if (typeof document === "undefined") return trimmed;

  const template = document.createElement("template");
  template.innerHTML = trimmed;
  normalizeFigureContainer(template.content);

  const result = template.innerHTML.trim();
  return result === "<p><br></p>" ? "" : result;
};

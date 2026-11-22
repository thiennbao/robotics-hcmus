import db from "./db";
import { deleteFile, getFile, uploadFile } from "./storage";
import { v4 as uuid } from "uuid";

export type PageSlug = "about" | "courses" | "news" | "competitions" | "contact";

export const PAGE_META: Record<
  PageSlug,
  {
    title: string;
    defaultBanner: string;
    publicPath: string;
    adminPath: string;
  }
> = {
  about: {
    title: "GIỚI THIỆU",
    defaultBanner: "static/wallpaper-about.png",
    publicPath: "/about",
    adminPath: "/admin/about",
  },
  courses: {
    title: "KHÓA HỌC",
    defaultBanner: "static/wallpaper-courses.png",
    publicPath: "/courses",
    adminPath: "/admin/courses",
  },
  news: {
    title: "TIN TỨC",
    defaultBanner: "static/wallpaper-news.png",
    publicPath: "/news",
    adminPath: "/admin/news",
  },
  competitions: {
    title: "CUỘC THI",
    defaultBanner: "static/wallpaper-competitions.png",
    publicPath: "/competitions",
    adminPath: "/admin/competitions",
  },
  contact: {
    title: "LIÊN HỆ",
    defaultBanner: "static/wallpaper-contact.png",
    publicPath: "/contact",
    adminPath: "/admin/contacts",
  },
};

const DEFAULT_ABOUT_PARAGRAPHS = [
  "Câu lạc bộ (CLB) Robotics &amp; IoT, được thành lập vào tháng 7/2015, trực thuộc sự quản lý của phòng thí nghiệm trí tuệ nhân tạo (AILAB) - Trường Đại học Khoa học Tự nhiên - ĐHQG TPHCM. CLB ra đời với mục tiêu tạo nên một không gian học thuật và nghiên cứu năng động, nơi các bạn sinh viên và học sinh có thể tiếp cận, tìm hiểu về lĩnh vực công nghệ đang phát triển mạnh mẽ là Robotics và Internet of Things (IoT) và sứ mệnh truyền cảm hứng, thúc đẩy tinh thần đổi mới sáng tạo trong lĩnh vực Robot và IoT.",
  "Thông qua các hoạt động nghiên cứu và thực hành, CLB Robotics &amp; IoT không chỉ giúp các thành viên nắm vững kiến thức nền tảng mà còn khuyến khích các bạn phát triển tư duy sáng tạo, kỹ năng giải quyết vấn đề trong môi trường công nghệ tiên tiến. Đây là nơi các bạn có thể chia sẻ, học hỏi kinh nghiệm lẫn nhau, cũng như phát triển các dự án cá nhân hay nhóm dưới sự hỗ trợ của các giảng viên từ AILAB.",
  "Từ 2015 - 2018, CLB Robotics &amp; IoT đã liên tiếp đoạt giải cao nhất trong cuộc thi Robotacon và Khoa học ứng dụng do Sở GD-ĐT TP.HCM tổ chức. Từ đó tạo tiền đề cho CLB được đề cử tham dự giải Olympic quốc tế về robot (WRO) tại Qatar, Ấn Độ và Costa Rica cũng như giải First Lego League (FLL) tại Úc và Nhật Bản. Đặc biệt, vào tháng 11/2018, tại Chiang Mai, Thái Lan, đội tuyển CLB Robotics - IoT đã vượt qua hơn 50 quốc gia để giành giải vô địch bảng Future Innovators của cuộc thi WRO.",
  "Từ năm 2023, với mong muốn tạo ra một sân chơi sáng tạo về Robot dành cho các bạn học sinh, CLB Robotics &amp; IoT đã tổ chức Cuộc thi Giải pháp Sáng tạo Robot - ROBOCUS (được tổ chức lần đầu tiên vào tháng 07/2023). Được tổ chức thường niên, ROBOCUS không chỉ là một sân chơi kỹ thuật mà còn là một nguồn cảm hứng bất tận cho các bạn nhỏ - thế hệ tương lai, tiếp tục khám phá và sáng tạo.",
  "Trong suốt quá trình hoạt động, CLB vinh dự trở thành đối tác và làm việc cùng nhiều đơn vị, tổ chức uy tín. CLB thường xuyên phối hợp với lãnh sự quán Hoa Kỳ tại TP.HCM để tổ chức nhiều khóa học thú vị và bổ ích. Các buổi hội thảo chuyên đề, các khóa học như Lego Spike Prime, Lego Mindstorms, Lập trình Arduino, Lập trình mobile, Kỹ sư nhí WEDO, ... đã thu hút được sự quan tâm lớn.",
  'Năm 2024, nhằm lan tỏa niềm đam mê công nghệ, sáng tạo Robot đến các bạn học sinh trên khắp mọi miền đất nước, CLB Robotics &amp; IoT lần đầu tiên tổ chức chương trình "Ngày hội kết nối công nghệ - Lắp ráp và lập trình xe điều khiển" với sự tài trợ của Trung tâm Hoa Kỳ thuộc Tổng lãnh sự quán Hoa Kỳ TP.HCM.',
];

export const isValidPageSlug = (value: string): value is PageSlug => {
  return Object.prototype.hasOwnProperty.call(PAGE_META, value);
};

export const getDefaultAboutContent = async (): Promise<string> => {
  const [introTop, introBot] = await Promise.all([
    getFile("static/intro-top.png"),
    getFile("static/intro-bot.png"),
  ]);

  return [
    `<p>${DEFAULT_ABOUT_PARAGRAPHS[0]}</p>`,
    `<p>${DEFAULT_ABOUT_PARAGRAPHS[1]}</p>`,
    `<p>${DEFAULT_ABOUT_PARAGRAPHS[2]}</p>`,
    `<p><img src="${introTop}" alt="Robotics &amp; IoT HCMUS"></p>`,
    `<p>${DEFAULT_ABOUT_PARAGRAPHS[3]}</p>`,
    `<p>${DEFAULT_ABOUT_PARAGRAPHS[4]}</p>`,
    `<p>${DEFAULT_ABOUT_PARAGRAPHS[5]}</p>`,
    `<p><img src="${introBot}" alt="Robotics &amp; IoT HCMUS"></p>`,
  ].join("");
};

export const getPageConfig = async (
  slug: PageSlug
): Promise<{ slug: PageSlug; bannerImage: string; content: string }> => {
  let record: { bannerImage: string; content: string | null } | null = null;
  try {
    record = await db.pageConfig.findUnique({
      where: { slug },
      select: { bannerImage: true, content: true },
    });
  } catch (error) {
    console.error(`Failed to read PageConfig for "${slug}":`, error);
  }

  const bannerImage = record?.bannerImage
    ? await getFile(record.bannerImage)
    : await getFile(PAGE_META[slug].defaultBanner);

  if (slug === "about") {
    const content =
      record?.content && record.content.trim().length > 0
        ? record.content
        : await getDefaultAboutContent();
    return { slug, bannerImage, content };
  }

  return {
    slug,
    bannerImage,
    content: record?.content ?? "",
  };
};

export const extractAboutBrief = (
  html: string,
  fallbackImage: string
): { paragraphs: string[]; image: string } => {
  const imgMatch = html.match(/<img\b[^>]*\bsrc=(["'])([^"']+)\1/i);
  const image = imgMatch?.[2]?.trim() ? imgMatch[2].trim() : fallbackImage;

  const paragraphs: string[] = [];
  const pRegex = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;

  while ((match = pRegex.exec(html)) !== null && paragraphs.length < 2) {
    const withoutImgs = match[1].replace(/<img\b[^>]*>/gi, "").trim();
    const visibleText = withoutImgs
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/gi, " ")
      .trim();

    if (visibleText.length > 0) {
      paragraphs.push(withoutImgs);
    }
  }

  if (paragraphs.length === 0) {
    return {
      paragraphs: [DEFAULT_ABOUT_PARAGRAPHS[0], DEFAULT_ABOUT_PARAGRAPHS[1]],
      image,
    };
  }

  return { paragraphs, image };
};

export const getAboutBrief = async (): Promise<{ paragraphs: string[]; image: string }> => {
  const [config, fallbackImg] = await Promise.all([
    getPageConfig("about"),
    getFile("static/intro-top.png"),
  ]);
  return extractAboutBrief(config.content, fallbackImg);
};

export const validateBase64Image = (
  dataUri: string,
  maxBytes = 10 * 1024 * 1024
): string | null => {
  const match = dataUri.match(/^data:image\/[a-zA-Z0-9.+-]+;base64,([A-Za-z0-9+/=\s]+)$/);
  if (!match) {
    return "Định dạng hình ảnh không hợp lệ. Chỉ hỗ trợ tệp hình ảnh.";
  }

  const cleanBase64 = match[1].replace(/\s+/g, "");
  const estimatedBytes = Math.ceil((cleanBase64.length * 3) / 4);
  if (estimatedBytes > maxBytes) {
    const maxMb = Math.round(maxBytes / (1024 * 1024));
    return `Dung lượng hình ảnh vượt quá giới hạn ${maxMb}MB.`;
  }

  return null;
};

const extractCloudinaryAboutContentUrls = (html: string | null): string[] => {
  if (!html) return [];
  const urls = new Set<string>();
  const imgRegex = /<img\b[^>]*\bsrc=(["'])([^"']+)\1/gi;
  let match: RegExpExecArray | null;

  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[2];
    if (
      src &&
      src.includes("res.cloudinary.com") &&
      (src.includes("/pages/about-content-") || src.includes("about-content-"))
    ) {
      urls.add(src);
    }
  }

  return Array.from(urls);
};

export const processRichTextImages = async (
  newHtml: string,
  oldHtml: string | null
): Promise<string> => {
  let updatedHtml = newHtml;
  const imgDataRegex = /<img\b[^>]*\bsrc=(["'])(data:image\/[^"']+)\1/gi;
  const dataUris = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = imgDataRegex.exec(newHtml)) !== null) {
    dataUris.add(match[2]);
  }

  for (const uri of Array.from(dataUris)) {
    const validationErr = validateBase64Image(uri);
    if (validationErr) {
      throw new Error(validationErr);
    }
    const uploadedUrl = await uploadFile(`pages/about-content-${uuid()}.jpeg`, uri);
    updatedHtml = updatedHtml.split(uri).join(uploadedUrl);
  }

  const oldUrls = extractCloudinaryAboutContentUrls(oldHtml);
  for (const oldUrl of oldUrls) {
    if (!updatedHtml.includes(oldUrl)) {
      await deleteFile(oldUrl);
    }
  }

  return updatedHtml;
};

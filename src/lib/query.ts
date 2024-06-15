import { Contact, Course, News, PrismaClient, Register, User } from "@prisma/client";
import { deleteFile, uploadFile } from "./storage";

// Prisma config

declare global {
  var prisma: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Utils

// export const createContent = async () => {};
// export const getContents = async () => {};
export const getContentByKey = async (key: string) => {
  try {
    return await prisma.content.findUnique({ where: { key } });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateContentByKey = async (key: string, content: string) => {
  try {
    await prisma.content.update({ where: { key }, data: { content } });
  } catch (error) {
    console.log(error);
  }
};
// export const deleteContentById = async () => {};

// Course
export const createCourse = async (data: Omit<Course, "id">) => {
  try {
    data.thumbnail = await uploadFile(data.thumbnail);
    data.gallery = await Promise.all(data.gallery.map(async (image) => uploadFile(image)));
    await prisma.course.create({ data });
  } catch (error) {
    console.log(error);
  }
};
export const getCourses = async (key?: string, skip?: number, take?: number) => {
  try {
    return await prisma.course.findMany({
      where: { name: { contains: key, mode: "insensitive" } },
      orderBy: { name: "asc" },
      skip,
      take,
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCourseById = async (id: string) => {
  try {
    return await prisma.course.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateCourseById = async (id: string, data: Omit<Course, "id">) => {
  try {
    const oldUrls = await prisma.course.findUnique({
      where: { id },
      select: { thumbnail: true, gallery: true },
    });
    if (!oldUrls) return;
    if (data.thumbnail !== oldUrls.thumbnail) {
      deleteFile(oldUrls.thumbnail);
      data.thumbnail = await uploadFile(data.thumbnail);
    }
    for (let url of oldUrls.gallery) {
      if (!data.gallery.includes(url)) {
        deleteFile(url);
      }
    }
    data.gallery = await Promise.all(
      data.gallery.map(async (image) =>
        image.startsWith("data:") ? await uploadFile(image) : image
      )
    );
    await prisma.course.update({ where: { id }, data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteCourseById = async (id: string) => {
  try {
    const oldUrls = await prisma.course.findUnique({
      where: { id },
      select: { thumbnail: true, gallery: true },
    });
    if (oldUrls) {
      deleteFile(oldUrls.thumbnail);
      for (let url of oldUrls.gallery) {
        deleteFile(url);
      }
    }
    await prisma.course.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
export const countCourses = async (key?: string) => {
  try {
    return await prisma.course.count({ where: { name: { contains: key, mode: "insensitive" } } });
  } catch (error) {
    console.log(error);
    return 0;
  }
};

// News
export const createNews = async (data: Omit<News, "id" | "date">) => {
  try {
    data.thumbnail = await uploadFile(data.thumbnail);
    await prisma.news.create({ data });
  } catch (error) {
    console.log(error);
  }
};
export const getNews = async (key?: string, skip?: number, take?: number) => {
  try {
    return await prisma.news.findMany({
      where: { title: { contains: key, mode: "insensitive" } },
      orderBy: { date: "asc" },
      skip,
      take,
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getNewsById = async (id: string) => {
  try {
    return await prisma.news.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateNewsById = async (id: string, data: Omit<News, "id" | "date">) => {
  try {
    const oldUrls = await prisma.news.findUnique({
      where: { id },
      select: { thumbnail: true },
    });
    if (!oldUrls) return;
    if (data.thumbnail !== oldUrls.thumbnail) {
      deleteFile(oldUrls.thumbnail);
      data.thumbnail = await uploadFile(data.thumbnail);
    }
    await prisma.news.update({ where: { id }, data });
  } catch (error) {
    console.log(error);
  }
};
export const deleteNewsById = async (id: string) => {
  try {
    const oldUrls = await prisma.news.findUnique({
      where: { id },
      select: { thumbnail: true },
    });
    if (oldUrls) {
      deleteFile(oldUrls.thumbnail);
    }
    await prisma.news.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
export const countNews = async (key?: string) => {
  try {
    return await prisma.news.count({ where: { title: { contains: key, mode: "insensitive" } } });
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const createContact = async (data: Omit<Contact, "id" | "read" | "date">) => {
  try {
    await prisma.contact.create({ data });
  } catch (error) {
    console.log(error);
  }
};
export const getContacts = async (key: string = "", skip?: number, take?: number) => {
  try {
    return await prisma.contact.findMany({
      where: {
        OR: [
          { subject: { contains: key, mode: "insensitive" } },
          { name: { contains: key, mode: "insensitive" } },
          { email: { contains: key, mode: "insensitive" } },
          { phone: { contains: key, mode: "insensitive" } },
          { message: { contains: key, mode: "insensitive" } },
        ],
      },
      orderBy: { date: "asc" },
      skip,
      take,
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getContactById = async (id: string) => {
  try {
    return await prisma.contact.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const readContactById = async (id: string, read: boolean) => {
  try {
    await prisma.contact.update({ where: { id }, data: { read } });
  } catch (error) {
    console.log(error);
  }
};
export const deleteContactById = async (id: string) => {
  try {
    await prisma.contact.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
export const countContacts = async (key: string = "") => {
  try {
    return await prisma.contact.count({
      where: {
        OR: [
          { subject: { contains: key, mode: "insensitive" } },
          { name: { contains: key, mode: "insensitive" } },
          { email: { contains: key, mode: "insensitive" } },
          { phone: { contains: key, mode: "insensitive" } },
          { message: { contains: key, mode: "insensitive" } },
        ],
      },
    });
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const createRegister = async (data: Omit<Register, "id" | "read" | "date">) => {
  try {
    await prisma.register.create({ data });
  } catch (error) {
    console.log(error);
  }
};
export const getRegisters = async (key: string = "", skip?: number, take?: number) => {
  try {
    return await prisma.register.findMany({
      where: {
        OR: [
          { course: { name: { contains: key, mode: "insensitive" } } },
          { name: { contains: key, mode: "insensitive" } },
          { email: { contains: key, mode: "insensitive" } },
          { phone: { contains: key, mode: "insensitive" } },
          { message: { contains: key, mode: "insensitive" } },
        ],
      },
      include: { course: { select: { name: true, thumbnail: true } } },
      orderBy: { date: "asc" },
      skip,
      take,
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getRegisterById = async (id: string) => {
  try {
    return await prisma.register.findUnique({
      where: { id },
      include: { course: { select: { name: true, thumbnail: true } } },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const readRegisterById = async (id: string, read: boolean) => {
  try {
    await prisma.register.update({ where: { id }, data: { read } });
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegisterById = async (id: string) => {
  try {
    await prisma.register.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
export const countRegisters = async (key: string = "") => {
  try {
    return await prisma.register.count({
      where: {
        OR: [
          { course: { name: { contains: key, mode: "insensitive" } } },
          { name: { contains: key, mode: "insensitive" } },
          { email: { contains: key, mode: "insensitive" } },
          { phone: { contains: key, mode: "insensitive" } },
          { message: { contains: key, mode: "insensitive" } },
        ],
      },
    });
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const createUser = async (data: Omit<User, "id" | "data">) => {
  try {
    // TODO: Hash password
    await prisma.user.create({ data });
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = async (key?: string, skip?: number, take?: number) => {
  try {
    return await prisma.user.findMany({
      where: { username: { contains: key, mode: "insensitive" } },
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const changUserPasswordById = async (id: string, password: string) => {
  try {
    // TODO: Hash password here
    await prisma.user.update({ where: { id }, data: { password } });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserById = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
export const countUsers = async (key?: string) => {
  try {
    return await prisma.user.count({ where: { username: { contains: key, mode: "insensitive" } } });
  } catch (error) {
    console.log(error);
    return 0;
  }
};

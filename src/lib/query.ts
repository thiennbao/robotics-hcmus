import { Course, News, PrismaClient } from "@prisma/client";
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
// export const getContentById = async () => {};
// export const updateContentById = async () => {};
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
      orderBy: { title: "asc" },
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

// export const createContact = async () => {};
// export const getContacts = async () => {};
// export const getContactById = async () => {};
// export const updateContactById = async () => {};
// export const deleteContactById = async () => {};

// export const createRegister = async () => {};
// export const getRegisters = async () => {};
// export const getRegisterById = async () => {};
// export const updateRegisterById = async () => {};
// export const deleteRegisterById = async () => {};

// export const createUser = async () => {};
// export const getUsers = async () => {};
// export const getUserById = async () => {};
// export const updateUserById = async () => {};
// export const deleteUserById = async () => {};

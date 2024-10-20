"use server";

import { revalidatePath } from "next/cache";
import db from "./db";
import { Issue, validateAll } from "./validation";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  authSchema,
  bannerSchema,
  contactSchema,
  courseSchema,
  messageSchema,
  competitionSchema,
  newsSchema,
  registerSchema,
  userSchema,
  changePasswordSchema,
} from "./schemas";
import { deleteFile, uploadFile } from "./storage";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { Banner, Contact, Course, Prisma, Role, User } from "@prisma/client";
import { signToken } from "./token";

// Import
export const importAction = async (model: Prisma.ModelName, data: any) => {
  try {
    data = JSON.parse(data);
    if (model === "Contact") {
      for (let item of data) {
        await db.contact.upsert({ where: { title: item.title }, update: item, create: item });
      }
    } else if (model === "Banner") {
      for (let item of data) {
        await db.banner.upsert({ where: { name: item.name }, update: item, create: item });
      }
    } else if (model === "Course") {
      for (let item of data) {
        await db.course.upsert({ where: { name: item.name }, update: item, create: item });
      }
    } else if (model === "News") {
      for (let item of data) {
        await db.news.upsert({ where: { title: item.title }, update: item, create: item });
      }
    } else if (model === "Competition") {
      for (let item of data) {
        await db.competition.upsert({ where: { title: item.title }, update: item, create: item });
      }
    } else if (model === "Message") {
      for (let item of data) {
        await db.message.upsert({ where: { id: item.id }, update: item, create: item });
      }
    } else if (model === "Register") {
      for (let item of data) {
        await db.register.upsert({ where: { id: item.id }, update: item, create: item });
      }
    } else {
      for (let item of data) {
        await db.user.upsert({ where: { username: item.username }, update: item, create: item });
      }
    }
    revalidatePath(`/admin/${model.toLowerCase()}`);
    return { message: "success" };
  } catch {
    return { message: "error" };
  }
};

// Contact
export const contactSaveAction = async (_prevState: any, formData: FormData) => {
  const origin = formData.get("origin") as string;
  const rawData = Object.keys(contactSchema).reduce(
    (obj, key) => Object.assign(obj, { [key]: formData.get(key) }),
    {}
  ) as { [key in keyof typeof contactSchema]: string };
  const issues = validateAll(rawData, contactSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const data = { ...rawData, order: Number(rawData.order) };
      if (origin) {
        await db.contact.update({ where: { title: origin }, data });
      } else {
        await db.contact.create({ data });
      }
      revalidatePath("/admin/contacts");
      redirect("/admin/contacts");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "title", message: "Từ khóa này đã tồn tại" };
        return { issues: [issue] };
      } else {
        throw error;
      }
    }
  }
};
export const contactDeleteAction = async (title: string) => {
  await db.contact.delete({ where: { title } });
  revalidatePath("/admin/contacts");
};

// Banner
export const bannerSaveAction = async (_prevState: any, formData: FormData) => {
  const origin = formData.get("origin") as string;
  const rawData = Object.keys(bannerSchema).reduce(
    (obj, key) => Object.assign(obj, { [key]: formData.get(key) }),
    {}
  ) as { [key in keyof typeof bannerSchema]: string };
  const issues = validateAll(rawData, bannerSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const data = { ...rawData, order: Number(rawData.order) };
      if (origin) {
        if (data.image.startsWith("data:")) {
          const oldUrls = await db.banner.findUnique({
            where: { name: origin },
            select: { image: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.image);
            data.image = await uploadFile(`banners/${data.name}.jpeg`, data.image);
          }
        }
        await db.banner.update({ where: { name: origin }, data });
      } else {
        data.image = await uploadFile(`banners/${data.name}.jpeg`, data.image);
        await db.banner.create({ data });
      }
      revalidatePath("/admin/banners");
      redirect("/admin/banners");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "name", message: "Tên này đã tồn tại" };
        return { issues: [issue] };
      } else {
        throw error;
      }
    }
  }
};
export const bannerDeleteAction = async (name: string) => {
  const oldUrls = await db.banner.findUnique({ where: { name }, select: { image: true } });
  if (oldUrls) await deleteFile(oldUrls.image);
  await db.banner.delete({ where: { name } });
  revalidatePath("/admin/banners");
};

// Course
export const courseSaveAction = async (_prevState: any, formData: FormData) => {
  const origin = formData.get("origin") as string;
  const rawData = Object.keys(courseSchema).reduce(
    (obj, key) => Object.assign(obj, { [key]: formData.get(key) }),
    {}
  ) as { [key in keyof typeof courseSchema]: string };
  const issues = validateAll(rawData, courseSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const data = { ...rawData, gallery: JSON.parse(rawData.gallery), order: Number(rawData.order) };
      if (origin) {
        // Get old urls
        const oldUrls = await db.course.findUnique({
          where: { name: origin },
          select: { thumbnail: true, gallery: true },
        });
        if (oldUrls) {
          // Delete and upload new thumbnail
          if (data.thumbnail !== oldUrls.thumbnail) {
            deleteFile(oldUrls.thumbnail);
            data.thumbnail = await uploadFile(`courses/${data.name}.jpeg`, data.thumbnail);
          }
          // Delete images in gallery
          for (let url of oldUrls.gallery) {
            if (!data.gallery.includes(url)) {
              deleteFile(url);
            }
          }
          // Upload new images
          data.gallery = await Promise.all(
            data.gallery.map(async (image: string) =>
              image.startsWith("data:") ? await uploadFile(`courses/${data.name}-gallery-${uuid()}.jpeg`, image) : image
            )
          );
        }
        await db.course.update({ where: { name: origin }, data });
      } else {
        data.thumbnail = await uploadFile(`courses/${data.name}.jpeg`, data.thumbnail);
        data.gallery = await Promise.all(
          data.gallery.map(async (image: string) => uploadFile(`courses/${data.name}-gallery-${uuid()}.jpeg`, image))
        );
        await db.course.create({ data });
      }
      revalidatePath("/admin/courses");
      redirect("/admin/courses");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "name", message: "Tên này đã tồn tại" };
        return { issues: [issue] };
      } else {
        throw error;
      }
    }
  }
};
export const courseDeleteAction = async (name: string) => {
  const oldUrls = await db.course.findUnique({
    where: { name },
    select: { thumbnail: true, gallery: true },
  });
  if (oldUrls) {
    deleteFile(oldUrls.thumbnail);
    for (let url of oldUrls.gallery) {
      deleteFile(url);
    }
  }
  await db.course.delete({ where: { name } });
  revalidatePath("/admin/courses");
};

// News
export const newsSaveAction = async (_prevState: any, formData: FormData) => {
  const origin = formData.get("origin") as string;
  const data = Object.keys(newsSchema).reduce((obj, key) => Object.assign(obj, { [key]: formData.get(key) }), {}) as {
    [key in keyof typeof newsSchema]: string;
  };
  const issues = validateAll(data, newsSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      if (origin) {
        if (data.thumbnail.startsWith("data:")) {
          const oldUrls = await db.news.findUnique({
            where: { title: origin },
            select: { thumbnail: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.thumbnail);
            data.thumbnail = await uploadFile(`news/${data.title}.jpeg`, data.thumbnail);
          }
        }
        await db.news.update({ where: { title: origin }, data });
      } else {
        data.thumbnail = await uploadFile(`news/${data.title}.jpeg`, data.thumbnail);
        await db.news.create({ data });
      }
      revalidatePath("/admin/news");
      redirect("/admin/news");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "title", message: "Tiêu đề này đã tồn tại" };
        return { issues: [issue] };
      } else {
        throw error;
      }
    }
  }
};
export const newsDeleteAction = async (title: string) => {
  const oldUrls = await db.news.findUnique({ where: { title }, select: { thumbnail: true } });
  if (oldUrls) await deleteFile(oldUrls.thumbnail);
  await db.news.delete({ where: { title } });
  revalidatePath("/admin/news");
};

// Competition
export const competitionSaveAction = async (_prevState: any, formData: FormData) => {
  const origin = formData.get("origin") as string;
  const rawData = Object.keys(competitionSchema).reduce(
    (obj, key) => Object.assign(obj, { [key]: formData.get(key) }),
    {}
  ) as { [key in keyof typeof competitionSchema]: string };
  const issues = validateAll(rawData, competitionSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const data = { ...rawData, order: Number(rawData.order) };
      if (origin) {
        if (data.thumbnail.startsWith("data:")) {
          const oldUrls = await db.competition.findUnique({
            where: { title: origin },
            select: { thumbnail: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.thumbnail);
            data.thumbnail = await uploadFile(`competitions/${data.title}.jpeg`, data.thumbnail);
          }
        }
        await db.competition.update({ where: { title: origin }, data });
      } else {
        data.thumbnail = await uploadFile(`competitions/${data.title}.jpeg`, data.thumbnail);
        await db.competition.create({ data });
      }
      revalidatePath("/admin/competitions");
      redirect("/admin/competitions");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "title", message: "Tiêu đề này đã tồn tại" };
        return { issues: [issue] };
      } else {
        throw error;
      }
    }
  }
};
export const competitionDeleteAction = async (title: string) => {
  await db.competition.delete({ where: { title } });
  revalidatePath("/admin/competitions");
};

// Message
export const messageSaveAction = async (_prevData: any, formData: FormData) => {
  const data = Object.keys(messageSchema).reduce(
    (obj, key) => Object.assign(obj, { [key]: formData.get(key) }),
    {}
  ) as { [key in keyof typeof messageSchema]: string };
  const issues = validateAll(data, messageSchema);
  if (issues.length) {
    return { issues };
  } else {
    await db.message.create({ data });
    return { issues: [] };
  }
};
export const messageReadAction = async (id: string, read: boolean) => {
  await db.message.update({ where: { id }, data: { read } });
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
};
export const messageDeleteAction = async (id: string) => {
  await db.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
};

// Register
export const registerSaveAction = async (_prevData: any, formData: FormData) => {
  const data = Object.keys(registerSchema).reduce(
    (obj, key) => Object.assign(obj, { [key]: formData.get(key) }),
    {}
  ) as { [key in keyof typeof registerSchema]: string };
  const issues = validateAll(data, registerSchema);
  if (issues.length) {
    return { issues };
  } else {
    await db.register.create({ data: { ...data, dob: new Date(data.dob) } });
    return { issues: [] };
  }
};
export const registerReadAction = async (id: string, read: boolean) => {
  await db.register.update({ where: { id }, data: { read } });
  revalidatePath("/admin/registers");
  redirect("/admin/registers");
};
export const registerDeleteAction = async (id: string) => {
  await db.register.delete({ where: { id } });
  revalidatePath("/admin/registers");
};

// User
export const userSaveAction = async (_prevState: any, formData: FormData) => {
  const origin = formData.get("origin") as string;
  const data = Object.keys(userSchema).reduce((obj, key) => Object.assign(obj, { [key]: formData.get(key) }), {}) as {
    [key in keyof typeof userSchema]: string;
  };

  const issues =
    data.password || !origin
      ? validateAll(data, userSchema)
      : validateAll({ username: data.username, role: data.role }, userSchema);

  if (issues.length) {
    return { issues };
  } else {
    try {
      if (origin) {
        if (data.password) {
          data.password = await bcrypt.hash(data.password || "", 10);
        }
        await db.user.update({ where: { username: origin }, data: data as User });
      } else {
        data.password = await bcrypt.hash(data.password, 10);
        await db.user.create({ data: data as User });
      }
      revalidatePath("/admin/users");
      redirect("/admin/users");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "username", message: "Tải khoản này đã tồn tại" };
        return { issues: [issue] };
      } else {
        throw error;
      }
    }
  }
};
export const userDeleteAction = async (username: string) => {
  await db.user.delete({ where: { username } });
  revalidatePath("/admin/users");
};
export const changePasswordAction = async (_prevState: any, formData: FormData) => {
  const origin = formData.get("origin") as string;
  const data = Object.keys(changePasswordSchema).reduce(
    (obj, key) => Object.assign(obj, { [key]: formData.get(key) }),
    {}
  ) as {
    [key in keyof typeof changePasswordSchema]: string;
  };

  const issues = validateAll(data, changePasswordSchema);
  if (issues.length) {
    return { issues };
  } else if (data.password !== data.confirm) {
    const issue: Issue = { path: "confirm", message: "Xác nhận mật khẩu không khớp" };
    return { issues: [issue] };
  } else {
    const user = await db.user.findUnique({ where: { username: origin } });
    if (user) {
      const match = await bcrypt.compare(data.old, user.password);
      if (!match) {
        const issue: Issue = { path: "old", message: "Mật khẩu không chính xác" };
        return { issues: [issue] };
      } else {
        const password = await bcrypt.hash(data.password, 10);
        await db.user.update({ where: { username: origin }, data: { password } });
        redirect("/admin");
      }
    }
  }
};

// Auth
export const authenticateAction = async (_prevState: any, formData: FormData) => {
  const data = Object.keys(authSchema).reduce((obj, key) => Object.assign(obj, { [key]: formData.get(key) }), {}) as {
    [key in keyof typeof authSchema]: string;
  };

  const issues = validateAll(data, authSchema);
  if (issues.length) {
    return { issues };
  } else {
    const foundUser = await db.user.findUnique({ where: { username: data.username } });
    if (!foundUser) {
      const issue: Issue = { path: "username", message: "Tài khoản không tồn tại" };
      return { issues: [issue] };
    }
    const match = await bcrypt.compare(data.password, foundUser.password);
    if (!match) {
      const issue: Issue = { path: "password", message: "Mật khẩu không chính xác" };
      return { issues: [issue] };
    }
    await signToken({ username: foundUser.username, role: foundUser.role });
    redirect("/admin");
  }
};

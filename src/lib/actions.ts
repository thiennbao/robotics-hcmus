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
} from "./schemas";
import { deleteFile, uploadFile } from "./storage";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { Prisma, Role } from "@prisma/client";
import { signToken } from "./token";

// Import
export const importAction = async (model: Prisma.ModelName, data: any) => {
  try {
    data = JSON.parse(data);
    if (model === "Competition") {
      for (let item of data) {
        await db.competition.upsert({ where: { title: item.title }, update: item, create: item });
      }
    } else if (model === "Contact") {
      for (let item of data) {
        await db.contact.upsert({ where: { title: item.key }, update: item, create: item });
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

// Competition
export const competitionSaveAction = async (_prevState: any, formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    address: formData.get("address") as string,
  };
  const issues = validateAll(data, competitionSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const id = formData.get("id") as string;
      if (id) {
        await db.competition.update({ where: { title: id }, data });
      } else {
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

// Contact
export const contactSaveAction = async (_prevState: any, formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    address: formData.get("address") as string,
  };
  const issues = validateAll(data, contactSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const id = formData.get("id") as string;
      if (id) {
        await db.contact.update({ where: { title: id }, data });
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
  const rawData = {
    name: formData.get("name") as string,
    desktopImg: formData.get("desktopImg") as string,
    mobileImg: formData.get("mobileImg") as string,
    order: formData.get("order") as string,
  };
  const issues = validateAll(rawData, bannerSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const data = { ...rawData, order: Number(formData.get("order")) };
      const id = formData.get("id") as string;
      if (id) {
        if (data.desktopImg.startsWith("data:")) {
          const oldUrls = await db.banner.findUnique({
            where: { name: id },
            select: { desktopImg: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.desktopImg);
            data.desktopImg = await uploadFile(`banners/${data.name}.jpeg`, data.desktopImg);
          }
        }
        if (data.mobileImg.startsWith("data:")) {
          const oldUrls = await db.banner.findUnique({
            where: { name: id },
            select: { mobileImg: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.mobileImg);
            data.mobileImg = await uploadFile(`banners/${data.name}.jpeg`, data.mobileImg);
          }
        }
        await db.banner.update({ where: { name: id }, data });
      } else {
        data.desktopImg = await uploadFile(`banners/${data.name}-desktop.jpeg`, data.desktopImg);
        data.mobileImg = await uploadFile(`banners/${data.name}-mobile.jpeg`, data.mobileImg);
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
  const oldUrls = await db.banner.findUnique({ where: { name }, select: { desktopImg: true, mobileImg: true } });
  if (oldUrls) {
    await deleteFile(oldUrls.desktopImg);
    await deleteFile(oldUrls.mobileImg);
  }
  await db.banner.delete({ where: { name } });
  revalidatePath("/admin/banners");
};

// Course
export const courseSaveAction = async (_prevState: any, formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    thumbnail: formData.get("thumbnail") as string,
    brief: formData.get("brief") as string,
    overview: formData.get("overview") as string,
    organization: formData.get("organization") as string,
    description: formData.get("description") as string,
    time: formData.get("time") as string,
    gallery: formData.getAll("gallery") as string[],
  };
  const issues = validateAll({ ...data, gallery: data.gallery.join() }, courseSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const id = formData.get("id") as string;
      if (id) {
        // Get old urls
        const oldUrls = await db.course.findUnique({
          where: { name: id },
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
            data.gallery.map(async (image) =>
              image.startsWith("data:") ? await uploadFile(`courses/${data.name}-gallery-${uuid()}.jpeg`, image) : image
            )
          );
        }
        await db.course.update({ where: { name: id }, data });
      } else {
        data.thumbnail = await uploadFile(`courses/${data.name}.jpeg`, data.thumbnail);
        data.gallery = await Promise.all(
          data.gallery.map(async (image) => uploadFile(`courses/${data.name}-gallery-${uuid()}.jpeg`, image))
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
  const data = {
    title: formData.get("title") as string,
    thumbnail: formData.get("thumbnail") as string,
    content: formData.get("content") as string,
  };
  const issues = validateAll(data, newsSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const id = formData.get("id") as string;
      if (id) {
        if (data.thumbnail.startsWith("data:")) {
          const oldUrls = await db.news.findUnique({
            where: { title: id },
            select: { thumbnail: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.thumbnail);
            data.thumbnail = await uploadFile(`news/${data.title}.jpeg`, data.thumbnail);
          }
        }
        await db.news.update({ where: { title: id }, data });
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

// Message
export const messageSaveAction = async (_prevData: any, formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
  };
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
  const data = {
    courseId: formData.get("courseId") as string,
    name: formData.get("name") as string,
    parentName: formData.get("parentName") as string,
    dob: formData.get("dob") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    time: formData.get("time") as string,
  };
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
  const id = formData.get("id") as string;

  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as Role,
  };

  const issues =
    data.password || !id
      ? validateAll(data, userSchema)
      : validateAll({ username: data.username, role: data.role }, userSchema);

  if (issues.length) {
    return { issues };
  } else {
    try {
      if (id) {
        if (data.password) {
          data.password = await bcrypt.hash(data.password || "", 10);
        }
        await db.user.update({ where: { username: id }, data });
      } else {
        data.password = await bcrypt.hash(data.password, 10);
        await db.user.create({ data });
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
  const data = {
    id: formData.get("id") as string,
    password: formData.get("password") as string,
    old: formData.get("old") as string,
    confirm: formData.get("confirm") as string,
  };

  const issues = validateAll({ password: data.password }, userSchema);
  if (issues.length) {
    return { issues };
  } else if (data.password !== data.confirm) {
    const issue: Issue = { path: "confirm", message: "Xác nhận mật khẩu không khớp" };
    return { issues: [issue] };
  } else {
    const user = await db.user.findUnique({ where: { username: data.id } });
    if (user) {
      const match = await bcrypt.compare(data.old, user.password);
      if (!match) {
        const issue: Issue = { path: "old", message: "Mật khẩu không chính xác" };
        return { issues: [issue] };
      } else {
        const password = await bcrypt.hash(data.password, 10);
        await db.user.update({ where: { username: data.id }, data: { password } });
        redirect("/admin");
      }
    }
  }
};

// Auth
export const authenticateAction = async (_prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  const issues = validateAll(data, authSchema);

  if (issues.length) {
    return { issues };
  } else {
    const { username, password } = data;
    const foundUser = await db.user.findUnique({ where: { username } });
    if (!foundUser) {
      const issue: Issue = { path: "username", message: "Tài khoản không tồn tại" };
      return { issues: [issue] };
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      const issue: Issue = { path: "password", message: "Mật khẩu không chính xác" };
      return { issues: [issue] };
    }

    await signToken({ username: foundUser.username, role: foundUser.role });

    redirect("/admin");
  }
};

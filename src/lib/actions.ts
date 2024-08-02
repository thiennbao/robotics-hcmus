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
  navigationSchema,
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
    if (model === "Navigation") {
      for (let item of data) {
        await db.navigation.upsert({ where: { title: item.title }, update: item, create: item });
      }
    } else if (model === "Contact") {
      for (let item of data) {
        if (!["Email", "Facebook", "Hotline", "Location"].includes(item.key)) continue;
        await db.contact.upsert({ where: { key: item.key }, update: item, create: item });
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

// Navigation
export const navigationSaveAction = async (_prevState: any, formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    address: formData.get("address") as string,
  };
  const issues = validateAll(data, navigationSchema);
  if (issues.length) {
    return { issues };
  } else {
    try {
      const id = formData.get("id") as string;
      if (id) {
        await db.navigation.update({ where: { title: id }, data });
      } else {
        await db.navigation.create({ data });
      }
      revalidatePath("/admin/navigations");
      redirect("/admin/navigations");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "title", message: "This title is already taken" };
        return { issues: [issue] };
      } else {
        throw error;
      }
    }
  }
};
export const navigationDeleteAction = async (title: string) => {
  await db.navigation.delete({ where: { title } });
  revalidatePath("/admin/navigations");
};

// Contact
export const contactSaveAction = async (_prevState: any, formData: FormData) => {
  const data = {
    key: formData.get("key") as string,
    title: formData.get("title") as string,
    address: formData.get("address") as string,
  };
  const issues = validateAll(data, contactSchema);
  if (issues.length) {
    return { issues };
  } else {
    const id = formData.get("id") as string;
    await db.contact.update({ where: { key: id }, data });
    revalidatePath("/admin/contacts");
    redirect("/admin/contacts");
  }
};

// Banner
export const bannerSaveAction = async (_prevState: any, formData: FormData) => {
  const rawData = {
    name: formData.get("name") as string,
    image: formData.get("image") as string,
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
        if (data.image.startsWith("data:")) {
          const oldUrls = await db.banner.findUnique({
            where: { name: id },
            select: { image: true },
          });
          if (oldUrls) {
            deleteFile(oldUrls.image);
            data.image = await uploadFile(`banners/${data.name}.jpeg`, data.image);
          }
        }
        await db.banner.update({ where: { name: id }, data });
      } else {
        data.image = await uploadFile(`banners/${data.name}.jpeg`, data.image);
        await db.banner.create({ data });
      }
      revalidatePath("/admin/banners");
      redirect("/admin/banners");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "name", message: "This name is already taken" };
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
  const data = {
    name: formData.get("name") as string,
    thumbnail: formData.get("thumbnail") as string,
    description: formData.get("description") as string,
    objective: formData.get("objective") as string,
    age: formData.get("age") as string,
    lesson: formData.get("lesson") as string,
    time: formData.get("time") as string,
    openDate: formData.get("openDate") as string,
    requirement: formData.get("requirement") as string,
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
              image.startsWith("data:")
                ? await uploadFile(`courses/${data.name}-gallery-${uuid()}.jpeg`, image)
                : image
            )
          );
        }
        await db.course.update({ where: { name: id }, data });
      } else {
        data.thumbnail = await uploadFile(`courses/${data.name}.jpeg`, data.thumbnail);
        data.gallery = await Promise.all(
          data.gallery.map(async (image) =>
            uploadFile(`courses/${data.name}-gallery-${uuid()}.jpeg`, image)
          )
        );
        await db.course.create({ data });
      }
      revalidatePath("/admin/courses");
      redirect("/admin/courses");
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        // Unique constraint error
        const issue: Issue = { path: "name", message: "This name is already taken" };
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
        const issue: Issue = { path: "title", message: "This title is already taken" };
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
        const issue: Issue = { path: "username", message: "This username is already taken" };
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
    const issue: Issue = { path: "confirm", message: "Confirm password not match" };
    return { issues: [issue] };
  } else {
    const user = await db.user.findUnique({ where: { username: data.id } });
    if (user) {
      const match = await bcrypt.compare(data.old, user.password);
      if (!match) {
        const issue: Issue = { path: "old", message: "Wrong password" };
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
      const issue: Issue = { path: "username", message: "Username not found" };
      return { issues: [issue] };
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      const issue: Issue = { path: "password", message: "Wrong password" };
      return { issues: [issue] };
    }

    await signToken({ username: foundUser.username, role: foundUser.role });

    redirect("/admin");
  }
};

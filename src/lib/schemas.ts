import { z } from "zod";

export const navigationSchema = z.object({
  title: z
    .string()
    .min(1, "Please fill out this field")
    .refine((title) => title !== "add", 'Title can not be "add" '),
  address: z.string().min(1, "Please fill out this field"),
});

export const contactSchema = z.object({
  key: z
    .string()
    .min(1, "Please fill out this field")
    .refine((title) => title !== "add", 'Key can not be "add" '),
  title: z.string(),
  address: z.string(),
});

export const bannerSchema = z.object({
  name: z
    .string()
    .min(1, "Please fill out this field")
    .refine((title) => title !== "add", 'Name can not be "add" '),
  image: z.string().min(1, "Please upload a photo"),
  order: z
    .number({ message: "Please enter a number" })
    .min(1, "Please enter a number greater than 0"),
});

export const courseSchema = z.object({
  name: z
    .string()
    .min(1, "Please fill out this field")
    .refine((title) => title !== "add", 'Name can not be "add" '),
  thumbnail: z.string().min(1, "Please upload a photo"),
  description: z.string().min(1, "Please fill out this field"),
  objective: z.string().min(1, "Please fill out this field"),
  age: z.string().min(1, "Please fill out this field"),
  lesson: z.string().min(1, "Please fill out this field"),
  duration: z.string().min(1, "Please fill out this field"),
  requirement: z.string().min(1, "Please fill out this field"),
  gallery: z.string().array().min(1, "Please upload a photo"),
});

export const newsSchema = z.object({
  title: z
    .string()
    .min(1, "Please fill out this field")
    .refine((title) => title !== "add", 'Title can not be "add" '),
  thumbnail: z.string().min(1, "Please fill out this field"),
  content: z.string().min(1, "Please fill out this field"),
});

export const userSchema = z.object({
  username: z
    .string()
    .min(4, "Please enter at lease 4 characters")
    .regex(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, nummbers or underscore (_)")
    .refine((username) => username !== "add", 'Username can not be "add" '),
  password: z
    .string({ message: "Please fill out this field" })
    .min(8, "Please enter at least 8 characters"),
  role: z.enum(["ADMIN", "ROOT"], { message: "Invalid role" }),
});

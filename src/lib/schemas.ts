import { Banner, Competition, Contact, Course, Message, News, Register, User } from "@prisma/client";
import { Validation } from "./validation";

export const contactSchema: { [key in keyof Contact]: Validation } = {
  title: { required: { message: "Vui lòng nhập vào trường này" } },
  address: { required: { message: "Vui lòng nhập vào trường này" } },
  order: {
    type: { value: "number", message: "Vui lòng nhập vào một chữ số" },
    minValue: { value: 1, message: "Vui lòng nhập vào một chữ số lớn hơn 0" },
  },
};

export const bannerSchema: { [key in keyof Banner]: Validation } = {
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  image: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  order: {
    type: { value: "number", message: "Vui lòng nhập vào một chữ số" },
    minValue: { value: 1, message: "Vui lòng nhập vào một chữ số lớn hơn 0" },
  },
};

export const courseSchema: { [key in keyof Omit<Course, "date">]: Validation } = {
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  thumbnail: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  brief: { required: { message: "Vui lòng nhập vào trường này" } },
  overview: { required: { message: "Vui lòng nhập vào trường này" } },
  organization: { required: { message: "Vui lòng nhập vào trường này" } },
  description: { required: { message: "Vui lòng nhập vào trường này" } },
  time: { required: { message: "Vui lòng nhập vào trường này" } },
  gallery: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  order: {
    type: { value: "number", message: "Vui lòng nhập vào một chữ số" },
    minValue: { value: 1, message: "Vui lòng nhập vào một chữ số lớn hơn 0" },
  },
};

export const newsSchema: { [key in keyof Omit<News, "date">]: Validation } = {
  title: { required: { message: "Vui lòng nhập vào trường này" } },
  thumbnail: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  content: { required: { message: "Vui lòng nhập vào trường này" } },
};

export const competitionSchema: { [key in keyof Competition]: Validation } = {
  title: { required: { message: "Vui lòng nhập vào trường này" } },
  address: { required: { message: "Vui lòng nhập vào trường này" } },
  description: { required: { message: "Vui lòng nhập vào trường này" } },
  thumbnail: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  order: {
    type: { value: "number", message: "Vui lòng nhập vào một chữ số" },
    minValue: { value: 1, message: "Vui lòng nhập vào một chữ số lớn hơn 0" },
  },
};

export const messageSchema: { [key in keyof Omit<Message, "id" | "date" | "read">]: Validation } = {
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  email: {
    required: { message: "Vui lòng nhập vào trường này" },
    regex: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Vui lòng nhập vào địa chỉ email hợp lệ" },
  },
  phone: {
    required: { message: "Vui lòng nhập vào trường này" },
    regex: { value: /^[0-9\-\+]{9,15}$/, message: "Vui lòng nhập vào số điện thoại hợp lệ" },
  },
  message: { required: { message: "Vui lòng nhập vào trường này" } },
};

export const registerSchema: { [key in keyof Omit<Register, "id" | "date" | "read">]: Validation } = {
  courseId: { required: { message: "Required" } },
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  parentName: { required: { message: "Vui lòng nhập vào trường này" } },
  dob: {
    required: { message: "Vui lòng nhập vào trường này" },
    type: { value: "date", message: "Vui lòng chọn một ngày" },
    regex: {
      value: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      message: "Vui lòng nhập vào một ngày hợp lệ",
    },
  },
  email: {
    required: { message: "Vui lòng nhập vào trường này" },
    regex: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Vui lòng nhập vào địa chỉ email hợp lệ" },
  },
  phone: {
    required: { message: "Vui lòng nhập vào trường này" },
    regex: { value: /^[0-9\-\+]{9,15}$/, message: "Vui lòng nhập vào số điện thoại hợp lệ" },
  },
  time: { required: { message: "Vui lòng chọn một khung giờ" } },
};

export const userSchema: { [key in keyof Omit<User, "date">]: Validation } = {
  username: {
    required: { message: "Vui lòng nhập vào trường này" },
    min: { value: 4, message: "Vui lòng nhập vào ít nhất 4 ký tự" },
    regex: { value: /^[a-zA-Z0-9_]*$/, message: "Tên đăng nhập chỉ có thể chứa chữ cái, số, hoặc dấu gạch dưới (_)" },
  },
  password: {
    required: { message: "Vui lòng nhập vào trường này" },
    min: { value: 8, message: "Vui lòng nhập vào ít nhất 8 ký tự" },
  },
  role: {
    required: { message: "Vui lòng nhập vào trường này" },
    include: { value: ["ADMIN", "ROOT"], message: "Vị trí không phù hợp" },
  },
};

export const authSchema = {
  username: { required: { message: "Vui lòng nhập vào trường này" } },
  password: { required: { message: "Vui lòng nhập vào trường này" } },
};

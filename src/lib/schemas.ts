export const navigationSchema = {
  title: { required: { message: "Please fill out this field" } },
  address: { required: { message: "Please fill out this field" } },
};

export const contactSchema = {
  key: { required: { message: "Please fill out this field" } },
  title: {},
  address: {},
};

export const bannerSchema = {
  name: { required: { message: "Please fill out this field" } },
  image: { required: { message: "Please upload a photo" } },
  order: {
    type: { value: "number" as "number", message: "Please enter a number" },
    minValue: { value: 1, message: "Please enter a number greater than 0" },
  },
};

export const courseSchema = {
  name: { required: { message: "Please fill out this field" } },
  thumbnail: { required: { message: "Please upload a photo" } },
  description: { required: { message: "Please fill out this field" } },
  objective: { required: { message: "Please fill out this field" } },
  age: { required: { message: "Please fill out this field" } },
  lesson: { required: { message: "Please fill out this field" } },
  time: { required: { message: "Please fill out this field" } },
  openDate: { required: { message: "Please fill out this field" } },
  requirement: { required: { message: "Please fill out this field" } },
  gallery: { required: { message: "Please upload a photo" } },
};

export const newsSchema = {
  title: { required: { message: "Please fill out this field" } },
  thumbnail: { required: { message: "Please upload a photo" } },
  content: { required: { message: "Please fill out this field" } },
};

export const messageSchema = {
  name: { required: { message: "Please fill out this field" } },
  email: { required: { message: "Please fill out this field" } },
  phone: { required: { message: "Please fill out this field" } },
  message: { required: { message: "Please fill out this field" } },
};

export const registerSchema = {
  courseId: { required: { message: "Required" } },
  name: { required: { message: "Please fill out this field" } },
  dob: {
    required: { message: "Please fill out this field" },
    type: { value: "date" as "date", message: "Please enter a date" },
  },
  email: { required: { message: "Please fill out this field" } },
  phone: { required: { message: "Please fill out this field" } },
  time: { required: { message: "Please choose a time slot" } },
};

export const userSchema = {
  username: {
    required: { message: "Please fill out this field" },
    min: { value: 4, message: "Please enter at least 4 characters" },
    regex: {
      value: /^[a-zA-Z0-9_]*$/,
      message: "Username can only contain letters, nummbers or underscore (_)",
    },
  },
  password: {
    required: { message: "Please fill out this field" },
    min: { value: 8, message: "Please enter at least 8 characters" },
  },
  role: {
    required: { message: "Please fill out this field" },
    include: { value: ["ADMIN", "ROOT"], message: "Invalid role" },
  },
};

export const authSchema = {
  username: { required: { message: "Please fill out this field" } },
  password: { required: { message: "Please fill out this field" } },
};

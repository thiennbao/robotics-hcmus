export const competitionSchema = {
  title: { required: { message: "Vui lòng nhập vào trường này" } },
  address: { required: { message: "Vui lòng nhập vào trường này" } },
};

export const contactSchema = {
  title: { required: { message: "Vui lòng nhập vào trường này" } },
  address: { required: { message: "Vui lòng nhập vào trường này" } },
};

export const bannerSchema = {
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  desktopImg: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  mobileImg: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  order: {
    type: { value: "number" as "number", message: "Vui lòng nhập vào một chữ số" },
    minValue: { value: 1, message: "Vui lòng nhập vào một chữ số lớn hơn 0" },
  },
};

export const courseSchema = {
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  thumbnail: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  brief: { required: { message: "Vui lòng nhập vào trường này" } },
  overview: { required: { message: "Vui lòng nhập vào trường này" } },
  organization: { required: { message: "Vui lòng nhập vào trường này" } },
  description: { required: { message: "Vui lòng nhập vào trường này" } },
  time: { required: { message: "Vui lòng nhập vào trường này" } },
  gallery: { required: { message: "Vui lòng tải lên một hình ảnh" } },
};

export const newsSchema = {
  title: { required: { message: "Vui lòng nhập vào trường này" } },
  thumbnail: { required: { message: "Vui lòng tải lên một hình ảnh" } },
  content: { required: { message: "Vui lòng nhập vào trường này" } },
};

export const messageSchema = {
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  email: { required: { message: "Vui lòng nhập vào trường này" } },
  phone: { required: { message: "Vui lòng nhập vào trường này" } },
  message: { required: { message: "Vui lòng nhập vào trường này" } },
};

export const registerSchema = {
  courseId: { required: { message: "Required" } },
  name: { required: { message: "Vui lòng nhập vào trường này" } },
  parentName: { required: { message: "Vui lòng nhập vào trường này" } },
  dob: {
    required: { message: "Vui lòng nhập vào trường này" },
    type: { value: "date" as "date", message: "Vui lòng chọn một ngày" },
  },
  email: { required: { message: "Vui lòng nhập vào trường này" } },
  phone: { required: { message: "Vui lòng nhập vào trường này" } },
  time: { required: { message: "Vui lòng chọn một khung giờ" } },
};

export const userSchema = {
  username: {
    required: { message: "Vui lòng nhập vào trường này" },
    min: { value: 4, message: "Vui lòng nhập vào ít nhất 4 ký tự" },
    regex: {
      value: /^[a-zA-Z0-9_]*$/,
      message: "Tên đăng nhập chỉ có thể chứa chữ cái, số, hoặc dấu gạch dưới (_)",
    },
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

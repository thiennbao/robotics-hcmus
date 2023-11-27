import axios from "axios";

const resourceApi = `${process.env.REACT_APP_SERVER_URL}/resource`;

// Course API
const getCourses = ({ key = "", skip = "", limit = "" } = {}) => {
  return axios.get(`${resourceApi}/course?key=${key}&skip=${skip}&limit=${limit}`);
};
const getSingleCourse = ({ id = "" } = {}) => {
  return axios.get(`${resourceApi}/course/${id}`);
};
const postCourse = ({ id = "", data = {} } = {}) => {
  return axios.post(`${resourceApi}/course`, data);
};
const patchCourse = ({ id = "", data = {} } = {}) => {
  return axios.patch(`${resourceApi}/course/${id}`, data);
};
const deleteCourse = ({ id = "" } = {}) => {
  return axios.delete(`${resourceApi}/course/${id}`);
};

// Blog API
const getBlogs = ({ key = "", skip = "", limit = "" } = {}) => {
  return axios.get(`${resourceApi}/blog?key=${key}&skip=${skip}&limit=${limit}`);
};
const getSingleBlog = ({ id = "" } = {}) => {
  return axios.get(`${resourceApi}/blog/${id}`);
};
const postBlog = ({ id = "", data = {} } = {}) => {
  return axios.post(`${resourceApi}/blog`, data);
};
const patchBlog = ({ id = "", data = {} } = {}) => {
  return axios.patch(`${resourceApi}/blog/${id}`, data);
};
const deleteBlog = ({ id = "" } = {}) => {
  return axios.delete(`${resourceApi}/blog/${id}`);
};

export const courseApi = { getCourses, getSingleCourse, postCourse, patchCourse, deleteCourse };
export const blogApi = { getBlogs, getSingleBlog, postBlog, patchBlog, deleteBlog };

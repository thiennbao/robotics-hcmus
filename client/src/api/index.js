import axios from "axios";

const apiUrl = `${process.env.REACT_APP_SERVER_URL}api`;

// Blog API
const getBlogs = ({ key = "", skip = "", limit = "" } = {}) => {
  return axios.get(`${apiUrl}/blog?key=${key}&skip=${skip}&limit=${limit}`);
};
const getSingleBlog = ({ id = "" } = {}) => {
  return axios.get(`${apiUrl}/blog/${id}`);
};
export const blogApi = { getBlogs, getSingleBlog };

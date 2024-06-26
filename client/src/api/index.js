import axios from "axios";

// Resource API
const resourceApiUrl = `${process.env.REACT_APP_SERVER_URL}api/resource`;

const getResources = ({
  resource = "",
  where = "",
  key = "",
  sort = "",
  order = "",
  skip = "",
  limit = "",
}) => {
  return axios.get(
    `${resourceApiUrl}/${resource}?where=${where}&key=${key}&sort=${sort}&order=${order}&skip=${skip}&limit=${limit}`,
    { withCredentials: true }
  );
};
const getSingleResource = ({ resource = "", id = "" }) => {
  return axios.get(`${resourceApiUrl}/${resource}/${id}`, { withCredentials: true });
};
const postResource = ({ resource = "", data = {} }) => {
  return axios.post(`${resourceApiUrl}/${resource}`, data, { withCredentials: true });
};
const patchResource = ({ resource = "", id = "", data = {} }) => {
  return axios.patch(`${resourceApiUrl}/${resource}/${id}`, data, { withCredentials: true });
};
const deleteResource = ({ resource = "", id = "" }) => {
  return axios.delete(`${resourceApiUrl}/${resource}/${id}`, { withCredentials: true });
};

export const resourceApi = {
  getResources,
  getSingleResource,
  postResource,
  patchResource,
  deleteResource,
};

// Auth API
const authApiUrl = `${process.env.REACT_APP_SERVER_URL}api/auth`;

const getAccountList = ({ where = "", key = "", sort = "", order = "", skip = "", limit = "" }) => {
  return axios.get(
    `${authApiUrl}/account?where=${where}&key=${key}&sort=${sort}&order=${order}&skip=${skip}&limit=${limit}`,
    { withCredentials: true }
  );
};
const getAccountInfo = ({ id = "" }) => {
  return axios.get(`${authApiUrl}/account/${id}`, { withCredentials: true });
};
const register = ({ data = {} }) => {
  return axios.post(`${authApiUrl}/account`, data, { withCredentials: true });
};
const changePassword = ({ id = "", data = {} }) => {
  return axios.patch(`${authApiUrl}/account/${id}`, data, { withCredentials: true });
};
const deleteAccount = ({ id = "" }) => {
  return axios.delete(`${authApiUrl}/account/${id}`, { withCredentials: true });
};
const login = ({ data }) => {
  return axios.post(`${authApiUrl}/login`, data, { withCredentials: true });
};
const verify = () => {
  return axios.get(`${authApiUrl}/verify`, { withCredentials: true });
};

export const authApi = {
  getAccountList,
  getAccountInfo,
  register,
  changePassword,
  deleteAccount,
  login,
  verify,
};

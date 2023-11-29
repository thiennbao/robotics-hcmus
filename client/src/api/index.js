import axios from "axios";

const resourceApiUrl = `${process.env.REACT_APP_SERVER_URL}/resource`;

// Resource API
const getResources = ({ resource = "", where = "", key = "", sort = "", order = "", skip = "", limit = "" } = {}) => {
  return axios.get(`${resourceApiUrl}/${resource}?where=${where}&key=${key}&sort=${sort}&order=${order}&skip=${skip}&limit=${limit}`);
};
const getSingleResource = ({ resource = "", id = "" } = {}) => {
  return axios.get(`${resourceApiUrl}/${resource}/${id}`);
};
const postResource = ({ resource = "", data = {} } = {}) => {
  return axios.post(`${resourceApiUrl}/${resource}`, data);
};
const patchResource = ({ resource = "", id = "", data = {} } = {}) => {
  return axios.patch(`${resourceApiUrl}/${resource}/${id}`, data);
};
const deleteResource = ({ resource = "", id = "" } = {}) => {
  return axios.delete(`${resourceApiUrl}/${resource}/${id}`);
};

export const resourceApi = {
  getResources,
  getSingleResource,
  postResource,
  patchResource,
  deleteResource,
};

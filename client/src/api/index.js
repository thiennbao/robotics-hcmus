import axios from "axios";

const apiUrl = `${process.env.REACT_APP_SERVER_URL}api`;

// Member API
const getMembers = ({ skip = "", limit = "" } = {}) => {
  return axios.get(`${apiUrl}/member?skip=${skip}&limit=${limit}`)
};
export const memberApi = { getMembers };

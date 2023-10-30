import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}api/application`;

export const getApplications = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getApplication = (id) => axios.get(`${url}/${id}`)
export const createApplication = (application) => axios.post(url, application)
export const setStatusApplication = (id, status) => axios.patch(`${url}/${id}`, {status})
export const deleteApplication = (id) => axios.delete(`${url}/${id}`)

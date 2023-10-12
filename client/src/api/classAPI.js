import axios from "axios";

const url = process.env.REACT_APP_SERVER_API + "/class";

export const getClasses = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getClass = (id) => axios.get(`${url}/${id}`)
export const createClass = (newClass) => axios.post(url, newClass)
export const editClass = (id, data) => axios.patch(`${url}/${id}`, data)
export const deleteClass = (id) => axios.delete(`${url}/${id}`)

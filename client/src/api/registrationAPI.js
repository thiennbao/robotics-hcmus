import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}api/registration`;

export const getRegistrations = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getRegistration = (id) => axios.get(`${url}/${id}`)
export const createRegistration = (registration) => axios.post(url, registration)
export const setStatusRegistration = (id, status) => axios.patch(`${url}/${id}`, {status})
export const deleteRegistration = (id) => axios.delete(`${url}/${id}`)

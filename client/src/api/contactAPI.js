import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}api/contact`;

export const getContacts = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getContact = (id) => axios.get(`${url}/${id}`)
export const createContact = (contact) => axios.post(url, contact)
export const setStatusContact = (id, status) => axios.patch(`${url}/${id}`, {status})
export const deleteContact = (id) => axios.delete(`${url}/${id}`)

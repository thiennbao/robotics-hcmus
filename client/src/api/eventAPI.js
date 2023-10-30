import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}api/event`;

export const getEvents = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getEvent = (id) => axios.get(`${url}/${id}`)
export const createEvent = (event) => axios.post(url, event)
export const editEvent = (id, event) => axios.patch(`${url}/${id}`, event)
export const deleteEvent = (id) => axios.delete(`${url}/${id}`)

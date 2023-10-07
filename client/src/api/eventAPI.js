import axios from "axios";

const url = process.env.REACT_APP_SERVER_API + "/event";

export const getEvents = () => axios.get(url)
export const getEvent = (id) => axios.get(`${url}/${id}`)
export const createEvent = (event) => axios.post(url, event)
export const editEvent = (id, event) => axios.patch(`${url}/${id}`, event)
export const deleteEvent = (id) => axios.delete(`${url}/${id}`)

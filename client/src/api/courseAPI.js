import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}api/course`;

export const getCourses = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getCourse = (id) => axios.get(`${url}/${id}`)
export const createCourse = (course) => axios.post(url, course)
export const editCourse = (id, course) => axios.patch(`${url}/${id}`, course)
export const deleteCourse = (id) => axios.delete(`${url}/${id}`)

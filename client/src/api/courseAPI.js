import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL + "/course";

export const getCourses = () => axios.get(url)
export const getCourse = (id) => axios.get(`${url}/${id}`)
export const createCourse = (course) => axios.post(url, course)
export const editCourse = (id, course) => {axios.patch(`${url}/${id}`, course)}
export const deleteCourse = (id) => axios.delete(`${url}/${id}`)

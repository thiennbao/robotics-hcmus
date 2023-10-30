import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}api/news`;

export const getNews = (skip, limit, key) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}&key=${key || ""}`)
export const getOneNews = (id) => axios.get(`${url}/${id}`)
export const createNews = (news) => axios.post(url, news)
export const editNews = (id, news) => axios.patch(`${url}/${id}`, news)
export const deleteNews = (id) => axios.delete(`${url}/${id}`)

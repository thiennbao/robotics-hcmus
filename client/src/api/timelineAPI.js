import axios from "axios";

const url = `${process.env.REACT_APP_SERVER_URL}api/timeline`;

export const getTimelines = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getTimeline = (id) => axios.get(`${url}/${id}`)
export const createTimeline = (timeline) => axios.post(url, timeline)
export const editTimeline = (id, timeline) => axios.patch(`${url}/${id}`, timeline)
export const deleteTimeline = (id) => axios.delete(`${url}/${id}`)

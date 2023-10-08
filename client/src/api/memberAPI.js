import axios from "axios";

const url = process.env.REACT_APP_SERVER_API + "/member";

export const getMembers = (skip, limit) => axios.get(`${url}?skip=${skip || ""}&limit=${limit || ""}`)
export const getMember = (id) => axios.get(`${url}/${id}`)
export const createMember = (member) => axios.post(url, member)
export const editMember = (id, member) => axios.patch(`${url}/${id}`, member)
export const deleteMember = (id) => axios.delete(`${url}/${id}`)

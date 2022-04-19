import axios from "axios";
export const loadUsersApi = async () => 
    await axios.get(`${process.env.REACT_APP_ENDPOINT}`)

export const createUserApi = async (user) => 
    await axios.post(`${process.env.REACT_APP_ENDPOINT}`, user)

export const updateUserApi = async (userId , user) => 
    await axios.put(`${process.env.REACT_APP_ENDPOINT}/${userId}`, user)


    

export const deleteUserApi = async (userId) => 
    await axios.delete(`${process.env.REACT_APP_ENDPOINT}/${userId}`)


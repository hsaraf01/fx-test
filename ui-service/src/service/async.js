import axios from "axios";
import { URL } from "../redux/constants";

export const fetchPreEvalQuestion = async () => {
   return  await axios.get(URL+'/preEvalQuestions').then(res => res.data);
}

export const fetchPostEvalQuestion = async () => {
    return await axios.get(URL+'/preEvalQuestions').then(res => res.data);
}

export const fetchUsers = async () => {
    return await axios.get(URL+'/users').then(res => res.data);
}

export const submitPreEval = async (submission) => {
    return await axios.post(URL+'/preEvalSubmission',submission);
}

export const submitPostEval = async (submission) => {
    return await axios.post(URL+'/postEvalSubmission',submission);
}

export const fetchTitle = async () => {
    return await axios.get(URL+'/title').then(res => res.data);
}

export const userLoggedInRequest = async (loggedInUser) => {
     await axios.post(URL+'/userLoggedIn',loggedInUser);
}





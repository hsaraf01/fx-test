import axios from "axios";

export const fetchPreEvalQuestion = async () => {
    const questions = await axios.get('http://localhost:9000/api/pre-evaluation')
        .then(res => res.data);
    return questions;
}

export const fetchPostEvalQuestion = async () => {
    const questions = await axios.get('http://localhost:9000/api/post-evaluation')
        .then(res => res.data);
    return questions;
}
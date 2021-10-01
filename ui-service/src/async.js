import axios from "axios";

export const fetchPreEvalQuestion = async () => {
    const questions = await axios.get('http://localhost:8080/preEvalQuestions')
        .then(res => res.data);
    return questions;
}

export const fetchPostEvalQuestion = async () => {
    const questions = await axios.get('http://localhost:9000/api/post-evaluation')
        .then(res => res.data);
    return questions;
}

export const fetchUsers = async () => {
    const users = await axios.get('http://localhost:8080/users')
        .then(res => res.data);
    return users;
}

export const submitPreEval = async (submission) => {
    const submissions = await axios.post('http://localhost:8080/preEvalSubmission',submission);
    return submissions;
}

export const fetchTitle = async () => {
    const title = await axios.get('http://localhost:8080/title')
        .then(res => res.data);
    return title;
}

export const sse = () => {
    var source = new EventSource('http://localhost:8080/stream-flux');
    source.addEventListener('periodic-event', addHandler, false);   
}

const addHandler = (event) => {
    console.log(event.data);
}
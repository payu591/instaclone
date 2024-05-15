import axios from "axios";

export function fetchAllStatusOnHomePage() {
    return axios.get(`http://localhost:8080/api/story/getstorybyfollowinguser/`);
}

export function createStatus(StatusData) {
    return axios.post(`http://localhost:8080/api/story/createstory/`, StatusData);
}

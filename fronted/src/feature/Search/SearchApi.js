import axios from "axios";

export function handleSearchResponce(Searchdata) {
    return axios.get(`http://localhost:8080/api/user/search?query=${Searchdata}`);
}

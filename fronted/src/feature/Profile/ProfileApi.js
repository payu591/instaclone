import axios from "axios";

export function fetchUserDetail(UserId) {
    return axios.get(`http://localhost:8080/api/user/${UserId}`);
}

export function fetchUserID() {
    return axios.get(`http://localhost:8080/api/user/getUserID`);
}

export function handleChangeProfilePic() {
    return axios.get(`http://dummy/api/`);
}

export function handleModifyProfile(updateDetail) {
    return axios.put(`http://localhost:8080/api/user`, updateDetail);
}

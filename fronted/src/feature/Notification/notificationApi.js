import axios from "axios";

export function fetchAllRequestByUser() {
    return axios.get(`http://localhost:8080/api/request/`);
}
export function HandleSendRequest(ReceiverId, Msg) {
    return axios.post(`http://localhost:8080/api/request/createrequest/${ReceiverId}`,{Msg});
}
export function HandlefollowbackRequest(ReceiverId, Msg) {
    return axios.post(`http://localhost:8080/api/request/followbackRequest/${ReceiverId}`,{Msg});
}
export function HandleModifyRequest({StatusRequest, Msg, RequestId}) {
    return axios.put(`http://localhost:8080/api/request/${RequestId}`, {StatusRequest, Msg});
}

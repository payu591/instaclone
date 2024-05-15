import axios from "axios";

export function fetchAllUserChats() {
    return axios.get(`http://localhost:8080/api/chat/getAllUserchats/`);
}

export function SendMessage(chatData, ChatId) {
    return axios.post(`http://localhost:8080/api/chat/${ChatId}`, chatData);
}

export function fetchChatMsg(ChatId) {
    return axios.get(`http://localhost:8080/api/chat/${ChatId}`);
}



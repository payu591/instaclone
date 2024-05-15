import axios from 'axios'
import { getLoggeduserId } from '../../app/constant';

export function fetchAllPostsByUser() {
     return axios.get(`http://localhost:8080/api/post`);
}

export function fetchAllPostsOnHomePage() {
     return axios.get(`http://dummy/api/post/`);
}

export function createPost(postObject) {
     return axios.post(`http://localhost:8080/api/post/createpost/`,postObject);
}

export function likePost(postId) {
     return axios.put(`http://localhost:8080/api/post/like/${postId}`);
}

export function commentPost({PostID,Commentcontent}) {
     // console.log(Commentcontent);
     return axios.post(`http://localhost:8080/api/post/comment/${PostID}`,{Commentcontent});
} 

export function deletePost(postId) {
     return axios.delete(`http://localhost:8080/api/post/${postId}`);
}



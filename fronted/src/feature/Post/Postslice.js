import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commentPost, createPost, fetchAllPostsByUser, fetchAllPostsOnHomePage, likePost } from './postApi';

const initialState = {
    userAllPosts: [],
    status: 'idle',
    HomePagePosts: []
};

export const fetchAllPostsByUserAsync = createAsyncThunk('post/fetchAllPostsByUser', async () => {
    try {
        const { data } = await fetchAllPostsByUser();
        return data;
    }
    catch (err) {
        console.log(err);
    };
}
);

export const fetchAllPostsOnHomePageAsync = createAsyncThunk('post/fetchAllPostsOnHomePage', async()=>{
    try {
        const { data } = await fetchAllPostsOnHomePage();
        return data;
    } catch (error) {
        console.log(error);
    }
})

export const createPostAsync = createAsyncThunk('post/createPostAsync', async(postObject)=>{
    try {
        const { data } = await createPost(postObject);
        return data;
    } catch (error) {
        console.log(error);
    }
})

export const handleLikePostAsync = createAsyncThunk('post/handleLikePostAsync', async(PostID)=>{
    const { data } = await likePost(PostID);
    return data;
})

export const handleCommentPostAsync = createAsyncThunk('post/handleCommentPostAsync', async({postID:PostID,Commentcontent})=>{
    try {
        // console.log({PostID,Commentcontent});
        const { data } = await commentPost({PostID,Commentcontent});
        return {data, PostID};

    } catch (error) {
        console.log(error);
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPostsByUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPostsByUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userAllPosts = action.payload;
            })
            .addCase(fetchAllPostsOnHomePageAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPostsOnHomePageAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.HomePagePosts = action.payload;
            })
            .addCase(createPostAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(handleLikePostAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(handleLikePostAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const PostIndex = state.userAllPosts.findIndex((item)=>item.id===action.payload.id);
                state.userAllPosts.splice(PostIndex, 1, action.payload);
            })
            .addCase(handleCommentPostAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(handleCommentPostAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const PostIndex = state.userAllPosts.findIndex((item)=>item.id===action.payload.PostID);
                state.userAllPosts[PostIndex].Comment.push(action.payload.data);
            });
    },
});

export const selectuserAllPosts = (state) => state.post.userAllPosts;
export const selectHomePagePosts = (state) => state.post.HomePagePosts;
export const selectPostUploadStatus = (state) => state.post.status;


export default postSlice.reducer;
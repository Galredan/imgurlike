import axios from "axios";

import fire from '../fire';

const url = 'http://localhost:3001/posts'

const createToken = async () => {

    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
        headers: {
           
            Authorization: `Bearer ${token}`,
        }
    };

    return payloadHeader;
}

export const addPost = async (formData) => {
    const header = await createToken();
    try {
        const res = await axios.post(url, formData, header);
        return res.data;
    }catch (e) {
        console.error(e);
    }
    
}

export const getPosts = async () => {
    const header = await createToken();

    try {
        const res = await axios.get(url, header)
        return res.data;
    } catch (e) {
        console.error(e);
    }
}
export const likePost = async (post) => {
    const header = await createToken();
    
    const likes = [...post.likes];
    likes.push(fire.auth().currentUser.email)
    const data= {
        id: post.id,
        likes: likes
    }
    try{
        const res = await axios.post(url+"/like", data, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }

}

export const unlikePost = async (post) => {
    const header = await createToken();
    
    const likes = [...post.likes];
    

    const index = likes.indexOf(fire.auth().currentUser.email);
    if (index > -1) {
        likes.splice(index, 1);
    }
    const data= {
        id: post.id,
        likes: likes
    }
    try{
        const res = await axios.post(url+"/like", data, header);
        return res.data;
    } catch (e) {
        console.error(e);
    }

}


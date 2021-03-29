import React from "react";


import {Box, Button, Image, Text, TextInput} from "grommet";
import {Favorite} from "grommet-icons";

import Card from "../../components/Card";
import CardConcave from "../../components/CardConcave";

import {Scrollbars} from 'react-custom-scrollbars';

import {addPost, getPosts, likePost, unlikePost} from "../../services/postsServices";
import { useSelector, useDispatch } from 'react-redux';
import {
    update, selectPosts
  } from './postsSlice';
import fire from '../../fire'
const Posts = () => {

    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    const [refresh,setrefresh]= React.useState(true)
    const [newpost, setNewpost] = React.useState(
        {
            content: '',
            photo: '',
            user: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('photo', newpost.photo);
        formData.append('content', newpost.content);
        formData.append('user', fire.auth().currentUser.email);
        if (newpost.content) {
            addPost(formData).then(()=>setrefresh(true))
        }
    }
    const handleChange = (e) => {
        setNewpost({...newpost, content: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewpost({...newpost, photo: e.target.files[0]});
    }
    const like = (post) => {

            likePost(post).then(()=>setrefresh(true) )

    }
    const unlike = (post) => {

            unlikePost(post).then(()=>setrefresh(true) )

    }

    React.useEffect(() => {

        const fecthPosts = async () => {
            const fetchData = await getPosts();
            dispatch(update(fetchData));
        }
        if (refresh) {
            fecthPosts();
            setrefresh(false);
        }
        
    }, [refresh, dispatch])


    return(
        <Box align="center" margin="medium">
            <form 
                onSubmit={handleSubmit} 
                encType='multipart/form-data' 
                action="/upload" 
                method="post">
                <Box direction="row" gap="small" align="center">
                    
                        <TextInput 
                            id='content-input' 
                            as="input" 
                            type="text" 
                            value={newpost.content} 
                            name="content" 
                            placeholder="content" 
                            onChange={handleChange} />
                        <input 
                            id='photo'
                            type="file" 
                            accept=".png, .jpg, .jpeg"
                            name='photo'
                            onChange={handlePhoto}/>
                        <Button id='submit' label="publier" type="submit"/>
                   
                </Box>
            </form>
            <Card 
            round="medium" 
            padding="medium" 
            justify="center"
            align="center"
            margin="medium"
            width="large"
            fill="vertical">
                <Scrollbars autoHeight autoHeightMax="100%">
                    
                    {posts ? 
                    posts.map(post => (
                        <CardConcave 
                        round="small"
                        padding="medium"
                        margin={{vertical: "small", horizontal:"large"}}
                        
                        alignSelf="center">
                            <Box margin={{horizontal: "small", top: "small"}} >
                                <Text size="xsmall" weight="bold">{post.user.split('@')[0]}</Text>
                            </Box>
                            <Box  
                                
                                margin={{horizontal: "small", bottom:"small"}}
                                direction="row"
                                justify="between"
                                align="center">
                                <Box fill="horizontal" gap="small">
                                    <Text>{post.content}</Text>
                                    <Box fill="horizontal" align="center">
                                        {post.img && (
                                            
                                            <Image src={`http://localhost:3001/images/${post.img}`} fit="cover" />
                                        )}
                                    </Box>
                                    
                                </Box>
                                
                                <Box direction="row" justify="center" align="center" gap="small">
                                    {post.likes.find(item => item === fire.auth().currentUser.email) ? 
                                        <Button icon={<Favorite size="small" color="red" />} onClick={()=> unlike(post)} />
                                    : 
                                        <Button icon={<Favorite size="small"/>} onClick={()=> like(post)} />
                                    }
                                    
                                    <Text size="small">{post.likes.length}</Text>
                                </Box>
                            </Box>
                        </CardConcave>
                    ))

                    : 
                    <Text>Ceci sont les posts</Text>
                    }
                </Scrollbars>
            </Card>
        </Box>
    )
}

export default Posts;

const postsRouter = require('express').Router();
const Post = require('../models/post');

postsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth){
        const posts = await Post.find({});
        return res.json(posts.map((post => post.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

postsRouter.post('/', (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const post = new Post(req.body)
        const savedPost = post.save()
        return res.status(201).json(savedPost);
    }
    return res.status(403).send('Not authorized')
    
});

module.exports = postsRouter;
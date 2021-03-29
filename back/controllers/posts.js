
const postsRouter = require('express').Router();
const Post = require('../models/post');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


postsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth){
        const posts = await Post.find({});
     
        req.io.emit('UPDATE', posts);
        return res.json(posts.map((post => post.toJSON())));
    }
    return res.status(403).send('Not authorized');  
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

postsRouter.route('/').post(upload.array('photo'), async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        const post = new Post({
            content: req.body.content[0],
            img: req.files ? req.files[0].filename : undefined,
            likes: req.body.likes,
            user: req.body.user,
        })
        const savedPost = post.save()
        const posts = await Post.find({});
        req.io.emit('UPDATE', posts);
        return res.status(201).json(savedPost);
    }
    return res.status(403).send('Not authorized')
    
});

postsRouter.post('/like', async (req, res)=> {
    const auth = req.currentUser;
    if (auth){
        try {
            const post = await Post.findById(req.body.id)
            console.log(req.body)
            post.likes = req.body.likes;
            const saved = post.save();
            const posts = await Post.find({});
            req.io.emit('UPDATE', posts);
            return res.status(201).json(saved);
        }
        catch (e){
            console.log(e)
        }
        
       
    }
    return res.status(500).send("Error server")
    
});

module.exports = postsRouter;
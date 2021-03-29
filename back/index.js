const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const postsRouter = require('./controllers/posts');
const morgan = require('morgan');
let path = require('path');


const app = express();
app.use('/images', express.static('images'));
morgan.token('body', (req, res) => JSON.stringify(req.body));
morgan.token('file', (req, res) => JSON.stringify(req.file));
morgan.token('res', (req, res) => JSON.stringify(res.file));
app.use(morgan(':method :status :body :res :file'));

app.use(cors());
app.use(decodeIDToken);
app.use(express.json());
var server = require("http").Server(app);
const socketio = require("socket.io")

// socket.io
io = socketio(server , {
    cors: {
      origin: '*',
    }});
// now all request have access to io
app.use(function (req, res, next) {
  req.io = io;
  next();
});

mongoose.connect(
    'mongodb+srv://admin:k6TjIs1IQIyyyWZd@instaclone.uld3e.mongodb.net/instaclone?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true 
    }, 
    { useFindAndModify: false }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));


app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello ynov toulouse');
});

const PORT = 3001;



server.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`);
});


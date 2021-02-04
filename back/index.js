const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const postsRouter = require('./controllers/posts');

const app = express();
app.use(cors());
app.use(decodeIDToken);
app.use(express.json());

mongoose.connect(
    'mongodb+srv://admin:k6TjIs1IQIyyyWZd@instaclone.uld3e.mongodb.net/instaclone?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true 
    }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));


app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello ynov toulouse');
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`);
});

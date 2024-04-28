const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from http://localhost:3000
}));

//middleware func-> post
app.use(express.json());

app.listen(3000);

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'frontend')));


app.get('/', (req, res) => {
    res.sendFile('./frontend/index.html', {root:__dirname});
    console.log("running");
});



//mini app
const userRouter = require('./routers/userRouter');
//const authRouter = require('./Routers/authRouter');
const cycleRouter = require('./routers/cycleRouter');
//const reviewRouter = require('./Routers/reviewRouter');

cycleRouter.use(express.json());


app.use('/user', userRouter);
app.use('/cycle', cycleRouter);
//app.use('/review', reviewRouter);
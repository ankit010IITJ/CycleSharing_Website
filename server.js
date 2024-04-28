const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = 3000;
const LOCAL_IP = '172.31.56.253'; // Replace this with your local IP address

app.use(cors({
  origin: `http://${LOCAL_IP}:${PORT}`
}));

//middleware func-> post
app.use(express.json());

app.listen(PORT, LOCAL_IP, () => {
  console.log(`Server running at http://${LOCAL_IP}:${PORT}`);
});

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
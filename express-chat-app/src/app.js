import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import cv from 'opencv4nodejs';

// Create app
const app = express();
const server = http.Server(app);
const io = socketIo(server);

const dbUrl = 'mongodb://localhost:27017/simple-chat';
mongoose.connect(dbUrl, { useNewUrlParser: true })


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

io.on('connection', socket =>{
  console.log('a user is connected')
  socket.on('stream',function(image){
    socket.broadcast.emit('stream',image);  
});

})

const Message = mongoose.model('Message', { name : String, message : String})

app.get('/test', (req, res) => res.send('fads'))

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  console.log('post');
  var message = new Message(req.body);
  console.log(message);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})



const FPS = 10;
const wCap = new cv.VideoCapture(0);


// cv.set(cv.IMG)

setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode('.jpg', frame).toString('base64');
  io.emit('image', image);
}, 1000 / FPS);







// NOTICE: this is not app (using app will not work!)
server.listen(3002, () => {
  console.log('server is running on port', 3002);
});
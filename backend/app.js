const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const employRouter = require('./routes/employee')
const app = express();
const db = require('./utils/connections')
const {Server} =require('socket.io')
const  dotenv = require('dotenv').config()
const http =require("http")
const server = http.createServer(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db()
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/employee',employRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//socket.io setup

const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]

  }
})
server.listen(3001,()=>{
  console.log("chat server running");
})
io.on("connection",(socket)=>{
  console.log("connected",socket.id);
  socket.on("disconnect",()=>{
    console.log("User Disconnected",socket.id);

  })
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

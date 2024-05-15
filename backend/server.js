const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const socket = require("socket.io");
const cookieParser = require('cookie-parser');
const cors = require('cors');

// authentication library
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


const User = require("./models/userModel");
const app = express();
const port = process.env.PORT || 5001;

//connecting to database
connectDb();

// import routes
const authRoute = require('./routes/auth');
const { sanitizeUser, isAuth, cookieExtractor } = require('./services/common');


const SECRET_KEY = 'SECRET_KEY';
// jwt options 
var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

// middleware
app.use(express.json());
app.use(express.static("build"));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));
app.use(passport.authenticate('session'));
app.use(cors());

app.get('/', (req, res) => {
    res.send("connected");
});

app.use(errorHandler);
// handle routes 
app.use('/auth', authRoute);
app.use("/api/user",isAuth(),require("./routes/userRoutes"));
app.use('/api/post',isAuth(),require("./routes/postRoutes"));
app.use('/api/chat',isAuth(),require("./routes/chatRoutes"));
app.use('/api/story',isAuth(),require("./routes/storyRoutes"));
app.use('/api/request',isAuth(), require("./routes/requestRoutes"));


// handle login 
passport.use(new LocalStrategy(
    { usernameField: 'Email' , passwordField: "Password"},
    async function (Email, Password, done) {
        try {
            // console.log(Email, Password);
            const user = await User.findOne({ Email: Email });
            if (user == null) {
                // done(iserror, isautorised, error message)
                return done(null, false, { message: 'invalid credentials' });
            }
            crypto.pbkdf2(Password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
                if (!crypto.timingSafeEqual(user.Password, hashedPassword)) {
                    return done(null, false, { message: 'invalid credentials' });
                }
                const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
                return done(null, { token }); // this line send to serliser 
            });
        } catch (error) {
            console.log(error);
            done(error)
            // return res.status(400).json(error);
        }
    }
));

//handle all request
passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, sanitizeUser(user));
        } else {
            return done(null, false);
        }
    } catch (error) {
        if (err) {
            return done(err, false);
        }
    }
}));


// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        console.log("serialize", user);
        return cb(null, user);
    });
});

// this changes session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        console.log("deserialize", user);
        return cb(null, user);
    });
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const io = socket(server, {
    cors: {
      origin: "http://localhost:8080",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
  
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log("add-user",userId);
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.ReceiverUserId);
      console.log(data.ReceiverUserId);
      console.log(sendUserSocket);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data);
      }
    });
  });
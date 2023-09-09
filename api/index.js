const express = require('express');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoute = require('./routes/users')
const homeRoute = require('./routes/home')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()
const app = express()

const PORT = process.env.PORT || 8800;
// .then(()=>{console.log("db connected")}).catch((err)=> console.log(err));

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

// middlewares
app.use(express.json());
app.use(helmet())
app.use(morgan("common"))

// routes handling
app.use('/', homeRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);


// In production level, we create our routes in a different 
// directory 

connectDB().then(() => {
    app.listen(PORT, ()=>{
        console.log("backend server is running!")
    })
})

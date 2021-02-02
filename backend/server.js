const express =require('express');
const cors =require('cors');
const mongoose =require('mongoose');
const morgan = require('morgan');
const connectDB=require('./db')

require('dotenv').config();


const app =express();
const port=process.env.PORT || 4000;

connectDB();

app.use(cors({origin:process.env.CLIENT_URL}));
// app.use(cors());
app.use(express.json());


app.use(morgan('dev'))

//loade routes
const authRouter=require('./routes/auth.route')
const userRouter=require('./routes/user.route')
const syllabusRouter = require('./routes/syllabus.route');
const feedbackRouter = require('./routes/feedback.route');


//use routes

syllabusRouter
app.use('/api', authRouter);
app.use('/user', userRouter);
app.use('/syllabus', syllabusRouter);
app.use('/feedback', feedbackRouter);









app.use(function(req,res){
    res.status(404).json({
        success:false,
        message:"Page not found"
    })
})



app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
});


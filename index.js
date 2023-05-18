const express= require('express');
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app=express();
app.use(cookieParser());

const port=9000;
const url= "mongodb://localhost:27017";

mongoose.connect(url,{useNewUrlParser: true});
const con= mongoose.connection;
app.use(express.json());
app.use(cors());
try{
    con.on('open',() => {
        console.log('connected');
    })
}catch(error)
{
    console.log("ttError: "+error);
}

const studentrouter= require("./routes/students_routes");
const projectrouter  = require("./routes/project_routes");
const taskrouter  = require("./routes/task_routes");
const authrouter = require('./routes/auth');

app.use('/students',studentrouter)
app.use('/projects',projectrouter)
app.use('/tasks',taskrouter)
app.use('/auth',authrouter)




app.listen(port, () =>{
    console.log('Server started');
})

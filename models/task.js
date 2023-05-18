const mongoose =require('mongoose');

const taskSchema = mongoose.Schema({

    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
        unique: false,    
    },
    status: {
        type: String,
        required: true,
        unique: false,
    },
    priority: {
        type: String,
        required: true,
    },
    project_Id: {
        type: String,
        required : false,
    },

})

var projectdata=mongoose.model('taskdata',taskSchema);
module.exports= projectdata;
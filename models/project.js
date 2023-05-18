const mongoose =require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    details: {
        type: String,
        required: true,
        unique: false,    
    },
    user_id: {
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },

    updated_at: {
        type: Date,
        default: new Date(),
    },
    hour: {
        type: Date,
        default: new Date(),
    },
})

var projectdata=mongoose.model('projectdata',projectSchema);
module.exports= projectdata;
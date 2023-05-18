
const express = require("express");

const  task = require("../controllers/task_controller.js"); 
const authJwt = require("../middlewares/authJwt");


const router = express.Router();


// Tasks
router.get('/:id', authJwt.verifyToken,task.getTasksByProjectId);
router.post('/:id',authJwt.verifyToken, task.addTaskToProject);
router.patch('/:id', authJwt.verifyToken,task.updateTaskStatus);
router.delete('/:id',authJwt.verifyToken, task.deleteTask);



module.exports=router;

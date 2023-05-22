
const express = require("express");

const  task = require("../controllers/task_controller.js"); 
const authJwt = require("../middlewares/authJwt");


const router = express.Router();


// Tasks
// router.get('/:id',task.getTasksByProjectId);
router.post('/:id', task.addTaskToProject);
router.patch('/:id',task.updateTaskStatus);
router.delete('/:id',task.deleteTask);
router.get('/:id',task.getTaskById);





module.exports=router;

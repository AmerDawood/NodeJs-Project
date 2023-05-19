const express = require("express");

const  project = require("../controllers/project_controller.js"); 
const authJwt = require("../middlewares/authJwt");


const router = express.Router();


// Project
router.post('/', project.createProject);
router.get('/all',  project.getProjects);
router.get('/:id',project.getProjectById);
router.delete('/:id',project.deleteProject);
router.patch('/:id', project.updateProject);


module.exports=router;
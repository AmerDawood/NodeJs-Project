const express = require("express");

const  project = require("../controllers/project_controller.js"); 
const authJwt = require("../middlewares/authJwt");


const router = express.Router();


// Project
router.post('/', authJwt.verifyToken, project.createProject);
router.get('/all',authJwt.verifyToken,  project.getProjects);
router.get('/:id', authJwt.verifyToken,project.getProjectById);
router.delete('/:id', authJwt.verifyToken,project.deleteProject);
router.patch('/:id', authJwt.verifyToken, project.updateProject);




module.exports=router;
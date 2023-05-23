const express= require('express');
const mongoose= require('mongoose');
const projectdata = require('../models/project.js');

const Project= require('../models/project.js');
const Task = require('../models/task.js');
const jwt = require("jsonwebtoken");
const { secret } = require("../token-config");


const router= express.Router();


const getProjects = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(403).json({
        message: 'No token provided!',
      });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;
    
    const projects = await Project.find({ user_id: userId });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
const createProject = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    const decoded = jwt.verify(token.split(' ')[1], secret);

    const userId = decoded.id;
    console.log(req.body);
    const hourlyRate = 10;
    const newProject = new Project({
      name: req.body.name,
      details: req.body.details,
      user_id: userId,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      // hour: req.body.hour,
    });

    try {
      await newProject.save();
      // const amountDue = await calculateAmountDue(req.body.created_by, hourlyRate);

      res.status(201).json({ newProject });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(403).json({ message: 'Invalid token!' });
  }
};



const getProjectById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    const decoded = jwt.verify(token.split(' ')[1], secret);

    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await Task.find({ project_Id: projectId });
    const doneTasks = tasks.filter(task => task.status === 'done');
    const doneTasksCount = doneTasks.length;
    const doneTasksWorkHourSum = doneTasks.reduce((sum, task) => sum + parseInt(task.workHour), 0);


    const populatedProject = {
      ...project._doc,
      tasks: tasks,
      doneTasksCount: doneTasksCount,
      doneTasksWorkHourSum: doneTasksWorkHourSum,
    };

    res.status(200).json(populatedProject);
  } catch (error) {
    res.status(403).json({ message: 'Invalid token!' });
  }
};

  
  
  const updateProject = async (req, res) => {
    const projectId = req.params.id;
    const updateFields = {
      name: req.body.name,
      details: req.body.details,
      status: req.body.status,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
    };
  
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
          message: 'No token provided!',
        });
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, secret);
      const userId = decoded.id;
  
      const updatedProject = await Project.findOneAndUpdate(
        {
          _id: projectId,
          user_id: userId,
        },
        updateFields,
        { new: true }
      );
  
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  


  const deleteProject = async (req, res) => {
    const projectId = req.params.id;
  
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
          message: 'No token provided!',
        });
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, secret);
      const userId = decoded.id;
  
      const deletedProject = await Project.findOneAndDelete({
        _id: projectId,
        user_id: userId,
      });
  
      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  






    
    
    
  
  

  
module.exports.getProjects= getProjects;
module.exports.createProject= createProject;
module.exports.getProjectById= getProjectById;
module.exports.updateProject= updateProject;
module.exports.deleteProject= deleteProject;







  
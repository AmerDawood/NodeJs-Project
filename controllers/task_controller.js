const express= require('express');
const mongoose= require('mongoose');
const projectdata = require('../models/project.js');

const Project= require('../models/project.js');
const Task = require('../models/task.js');


const router= express.Router();


const addTaskToProject = async (req, res) => {
    const projectId = req.params.id;
    const { title, description, priority, workHours, status } = req.body;
  
    try {
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      const newTask = new Task({
        project_Id: projectId,
        title,
        description,
        priority,
        workHours,
        status,
      });
  
      await newTask.save();
  
      res.status(201).json(newTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
    

    const getTasksByProjectId = async (req, res) => {
      const projectId = req.params.id;
    
      try {
        const tasks = await Task.find({ project_Id: projectId });
    
        if (!tasks || tasks.length === 0) {
          return res.status(404).json({ message: 'No tasks found for the project' });
        }
    
        res.status(200).json(tasks);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };

    const updateTaskStatus = async (req, res) => {
      const taskId = req.params.id;
          const { status } = req.body;

            const validStatusValues = ["to do", "in progress", "QA", "done"];
      if (!validStatusValues.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
    
      try {
        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          { status },
          { new: true }
        );
    
        if (!updatedTask) {
          return res.status(404).json({ message: "Task not found" });
        }
    
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };

    const deleteTask = async (req, res) => {
      const taskId = req.params.id;
    
      try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
    
        if (!deletedTask) {
          return res.status(404).json({ message: "Task not found" });
        }
    
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };


module.exports.deleteTask =deleteTask;


module.exports.updateTaskStatus= updateTaskStatus;


module.exports.addTaskToProject= addTaskToProject;


module.exports.getTasksByProjectId = getTasksByProjectId;
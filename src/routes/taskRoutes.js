const express = require('express');
const SequelizeTaskRepository = require('../adapters/db/SequelizeTaskRepository');
const TaskService = require('../application/services/TaskService');

const router = express.Router();
const taskRepository = new SequelizeTaskRepository();
const taskService = new TaskService(taskRepository);

// Add a task for a user
router.post('/users/:userId/tasks', async (req, res) => {
  try {
    const { userId } = req.params;
    const task = await taskService.addTask(userId, req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get tasks for a user
router.get('/users/:userId/tasks', async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await taskService.getTasksByUser(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

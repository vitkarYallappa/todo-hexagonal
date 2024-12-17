const Task = require('../../domain/Task');
const { v4: uuidv4 } = require('uuid');

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async addTask(userId, data) {
    const task = new Task(uuidv4(), userId, data.title);
    task.validate();
    return await this.taskRepository.create(task);
  }

  async getTasksByUser(userId) {
    return await this.taskRepository.findByUserId(userId);
  }
}

module.exports = TaskService;

const TaskRepositoryPort = require('../../ports/TaskRepositoryPort');
const { TaskModel } = require('./models/TaskModel');

class SequelizeTaskRepository extends TaskRepositoryPort {
  async create(task) {
    return await TaskModel.create({
      id: task.id,
      userId: task.userId,
      title: task.title,
      completed: task.completed,
    });
  }

  async findByUserId(userId) {
    return await TaskModel.findAll({ where: { userId } });
  }
}

module.exports = SequelizeTaskRepository;

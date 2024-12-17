const TaskService = require('./TaskService');
const Task = require('../../domain/Task');

describe('TaskService', () => {
  let taskRepositoryMock;
  let taskService;

  beforeEach(() => {
    taskRepositoryMock = {
      create: jest.fn(),
      findByUserId: jest.fn(),
    };

    taskService = new TaskService(taskRepositoryMock);
  });

  it('should add a task for a specific user', async () => {
    // Arrange
    const userId = 'user-123';
    const taskData = { title: 'Learn TDD' };
    const createdTask = { id: 'task-1', userId, ...taskData, completed: false };

    taskRepositoryMock.create.mockResolvedValue(createdTask);

    // Act
    const result = await taskService.addTask(userId, taskData);

    // Assert
    expect(taskRepositoryMock.create).toHaveBeenCalledWith(expect.any(Task));
    expect(result).toEqual(createdTask);
  });

  it('should retrieve tasks for a specific user', async () => {
    // Arrange
    const userId = 'user-123';
    const tasks = [
      { id: 'task-1', userId, title: 'Task 1', completed: false },
      { id: 'task-2', userId, title: 'Task 2', completed: true },
    ];

    taskRepositoryMock.findByUserId.mockResolvedValue(tasks);

    // Act
    const result = await taskService.getTasksByUser(userId);

    // Assert
    expect(taskRepositoryMock.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(tasks);
  });

  it('should throw an error if task title is empty', async () => {
    // Arrange
    const userId = 'user-123';
    const invalidTaskData = { title: '' };

    // Act & Assert
    await expect(taskService.addTask(userId, invalidTaskData)).rejects.toThrow('Task title is required');
    expect(taskRepositoryMock.create).not.toHaveBeenCalled();
  });
});

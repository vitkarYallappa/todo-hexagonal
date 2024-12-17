class Task {
    constructor(id, userId, title, completed = false) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.completed = completed;
    }
  
    validate() {
      if (!this.title || this.title.trim() === '') {
        throw new Error('Task title is required');
      }
    }
  }
  
  module.exports = Task;
  
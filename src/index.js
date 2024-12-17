const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/dbConnection');
const { TaskModel } = require('./adapters/db/models/TaskModel');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Sync Database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
})();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

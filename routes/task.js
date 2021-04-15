const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const pagination = require('../middlewares/pagination.mw');
const taskInstance = require('../middlewares/taskInstance.mw');

const taskRouter = Router();

taskRouter.post('/', TaskController.createTask);

taskRouter.get('/', pagination, TaskController.getAllTasks);
taskRouter.get('/:taskId', taskInstance, TaskController.getTask);
taskRouter.patch('/:taskId', taskInstance, TaskController.updateTask);
taskRouter.delete('/:taskId', taskInstance, TaskController.deleteTask);

module.exports = taskRouter;

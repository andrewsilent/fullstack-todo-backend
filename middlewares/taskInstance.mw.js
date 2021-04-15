const { Task } = require('../models');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }

    req.task = task;
    next();
  } catch (err) {
    next(err);
  }
};

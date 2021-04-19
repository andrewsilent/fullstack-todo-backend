const { Task } = require('../models');
const createError = require('http-errors');

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body: { body, deadline, isDone },
    } = req;

    const task = await Task.create({
      body,
      deadline,
      isDone,
    });

    if (!task) {
      return next(createError(400, 'Bad request. Task was not created'));
    }

    res.status(201).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const {
      pagination: { limit, offset },
    } = req;

    const { count: tasksCount, rows: tasks } = await Task.findAndCountAll({
      limit,
      offset,
    });

    if (!tasks) {
      return next(createError(404, 'Tasks not found'));
    }

    res.status(200).send({
      pagination: {
        tasksCount: tasksCount,
        pagesCount: Math.ceil(tasksCount / limit),
        pageSize: Number(limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const { task } = req;
    res.status(200).send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      body: { body, deadline, isDone },
      task,
    } = req;

    const updatedTask = await task.update(
      {
        body,
        deadline,
        isDone,
      },
      { returning: true },
    );

    if (!updatedTask) {
      return next(createError(400, 'Bad request. Task was not updated'));
    }

    res.status(200).send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { task } = req;

    await task.destroy({
      where: { id: task.id },
      limit: 1,
    });

    res.status(200).send({ message: 'Task is gone' });
  } catch (err) {
    next(err);
  }
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {}
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          is: /\w\s/i,
          notNull: true,
          notEmpty: true,
        },
      },
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_done',
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    },
  );
  return Task;
};

'use strict';

const { taskSeed } = require('../constants/taskSeed');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tasks = Array(100)
      .fill(null)
      .map(() => {
        const body = taskSeed
          .map(
            phraseList =>
              phraseList[Math.floor(Math.random() * phraseList.length)],
          )
          .join('');
        return {
          body: body,
          is_done: Math.random() > 0.25 ? false : true,
          deadline: new Date(Date.now() + Math.random() * 1000000000),
          created_at: new Date(),
          updated_at: new Date(),
        };
      });
    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};

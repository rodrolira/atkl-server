'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('releases')
    if (!tableInfo.genre_id) {
      await queryInterface.addColumn('releases', 'genre_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genres',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('releases')
    if (tableInfo.genre_id) {
      await queryInterface.removeColumn('releases', 'genre_id')
    }
  }
};

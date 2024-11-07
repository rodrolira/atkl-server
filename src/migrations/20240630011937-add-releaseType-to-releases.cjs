'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('releases')
    if (!tableInfo.release_type) {
      await queryInterface.addColumn('releases', 'release_type', {
        type: Sequelize.ENUM('Album', 'EP', 'Single', 'V.A'),
        allowNull: false,
      })
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('releases')
    if (tableInfo.release_type) {
      await queryInterface.removeColumn('releases', 'release_type')
    }
  }
};

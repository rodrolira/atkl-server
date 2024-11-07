'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('artists')

    if (!tableInfo.bandcamp_link) {
      await queryInterface.addColumn('artists', 'bandcamp_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }

    if (!tableInfo.beatport_link) {
      await queryInterface.addColumn('artists', 'beatport_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }

    if (!tableInfo.spotify_link) {
      await queryInterface.addColumn('artists', 'spotify_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }

    if (!tableInfo.instagram_link) {
      await queryInterface.addColumn('artists', 'instagram_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }

    if (!tableInfo.youtube_link) {
      await queryInterface.addColumn('artists', 'youtube_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('artists', 'bandcamp_link')
    await queryInterface.removeColumn('artists', 'beatport_link')
    await queryInterface.removeColumn('artists', 'spotify_link')
    await queryInterface.removeColumn('artists', 'instagram_link')
    await queryInterface.removeColumn('artists', 'youtube_link')
  }
};

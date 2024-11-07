'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('releases')

    if (!tableInfo.bandcamp_link) {
      await queryInterface.addColumn('releases', 'bandcamp_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.beatport_link) {
      await queryInterface.addColumn('releases', 'beatport_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.spotify_link) {
      await queryInterface.addColumn('releases', 'spotify_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.apple_music_link) {
      await queryInterface.addColumn('releases', 'apple_music_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.youtube_link) {
      await queryInterface.addColumn('releases', 'youtube_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.soundcloud_link) {
      await queryInterface.addColumn('releases', 'soundcloud_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.facebook_link) {
      await queryInterface.addColumn('releases', 'facebook_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.instagram_link) {
      await queryInterface.addColumn('releases', 'instagram_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
    if (!tableInfo.twitter_link) {
      await queryInterface.addColumn('releases', 'twitter_link', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('releases')

    if (tableInfo.bandcamp_link) {
      await queryInterface.removeColumn('releases', 'bandcamp_link')
    }
    if (tableInfo.beatport_link) {
      await queryInterface.removeColumn('releases', 'beatport_link')
    }
    if (tableInfo.spotify_link) {
      await queryInterface.removeColumn('releases', 'spotify_link')
    }
    if (tableInfo.apple_music_link) {
      await queryInterface.removeColumn('releases', 'apple_music_link')
    }
    if (tableInfo.youtube_link) {
      await queryInterface.removeColumn('releases', 'youtube_link')
    }
    if (tableInfo.soundcloud_link) {
      await queryInterface.removeColumn('releases', 'soundcloud_link')
    }
    if (tableInfo.facebook_link) {
      await queryInterface.removeColumn('releases', 'facebook_link')
    }
    if (tableInfo.instagram_link) {
      await queryInterface.removeColumn('releases', 'instagram_link')
    }
    if (tableInfo.twitter_link) {
      await queryInterface.removeColumn('releases', 'twitter_link')
    }
  }
};

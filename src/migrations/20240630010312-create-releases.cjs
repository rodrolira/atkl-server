"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("releases", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_explicit: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      genre: {
        type: Sequelize.ENUM(
          "Techno",
          "Industrial Techno",
          "Hard Techno",
          "Acid Techno",
          "Hardcore",
          "Schranz"
        ),
        allowNull: true,
      },
      cover_image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      release_type: {
        type: Sequelize.ENUM("Album", "EP", "Single", "V.A"),
        allowNull: false,
      },
      bandcamp_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      beatport_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      spotify_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      apple_music_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      youtube_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      soundcloud_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("releases");
  }
};

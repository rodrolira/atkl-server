'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Lista de géneros a agregar
    const genres = [
      { name: 'Techno' },
      { name: 'Hard Techno' },
      { name: 'Industrial Techno' },
      { name: 'Acid Techno' },
      { name: 'Hardcore' },
      { name: 'Hardcore Techno' }
    ];

    return queryInterface.bulkInsert('genres', genres);
  },

  async down(queryInterface, Sequelize) {
    // Revertir la inserción de los géneros
    return queryInterface.bulkDelete('genres', {
      name: [
        'Techno',
        'Hard Techno',
        'Industrial Techno',
        'Acid Techno',
        'Hardcore',
        'Hardcore Techno'
      ]
    });
  }
};

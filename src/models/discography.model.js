// models/discography.js
import { DataTypes } from 'sequelize'
import sequelize from '../../db/sequelize.js'

const Discography = sequelize.define(
    'Discography',
    {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'title', // nombre de la columna en la base de datos
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'artist', // nombre de la columna en la base de datos
    },
    release_title: {
        type: DataTypes.STRING,
        field: 'release_title', // nombre de la columna en la base de datos
    },
    catalogue: {
        type: DataTypes.STRING,
        field: 'catalogue', // nombre de la columna en la base de datos
    },
    release_type: {
        type: DataTypes.STRING,
        field: 'release_type', // nombre de la columna en la base de datos
    },
    release_date: {
        type: DataTypes.DATE,
        field: 'release_date', // nombre de la columna en la base de datos
    },
    genre: {
        type: DataTypes.STRING,
        field: 'genre', // nombre de la columna en la base de datos
    },
    file_info: {
        type: DataTypes.STRING,
        field: 'file_info', // nombre de la columna en la base de datos
    },
    download_url: {
        type: DataTypes.STRING,
        field: 'download_url', // nombre de la columna en la base de datos
    },
}, {
    timestamps: false, // Si no quieres que Sequelize añada campos `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que Sequelize use snake_case en lugar de camelCase
})

export default Discography

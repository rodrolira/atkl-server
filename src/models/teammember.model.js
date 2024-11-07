// models/teammember.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize.js';

const TeamMember = sequelize.define(
  'TeamMember',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'position',
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'image_url',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'bio',
    },
  },
  {
    timestamps: true,
    tableName: 'team_members', // Nombre de la tabla en la base de datos
  }
);

export default TeamMember;

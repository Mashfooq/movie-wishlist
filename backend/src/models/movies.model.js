// Define the Sequelize model for the movies table
import { DataTypes } from 'sequelize';
import { sequelize } from "../database/postgresConnection.js";

const Movies = sequelize.define('Movies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imdb_ID: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  movie_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content_type: {
    type: DataTypes.ENUM('movie', 'series', 'episode'),
    allowNull: false
  },
  full_response: {
    type: DataTypes.JSON,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'movies'
});

export {
    Movies
};

// Define the Sequelize model for the movies table
import { DataTypes } from 'sequelize';
import { sequelize } from "../database/postgresConnection.js";

// Define the MovieData model
const MovieData = sequelize.define('movie_data', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movie_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    adult: {
        type: DataTypes.BOOLEAN
    },
    genre_ids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    original_language: {
        type: DataTypes.STRING(10)
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    original_title: {
        type: DataTypes.STRING(255)
    },
    overview: {
        type: DataTypes.TEXT
    },
    popularity: {
        type: DataTypes.DECIMAL(10, 3)
    },
    backdrop_path: {
        type: DataTypes.STRING(255)
    },
    poster_path: {
        type: DataTypes.STRING(255)
    },
    release_date: {
        type: DataTypes.DATE
    },
    video: {
        type: DataTypes.BOOLEAN
    },
    vote_average: {
        type: DataTypes.DECIMAL(5, 3)
    },
    vote_count: {
        type: DataTypes.INTEGER
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
    tableName: 'movie_data',
    timestamps: false // Disable Sequelize's automatic timestamps
});

export {
    MovieData
};

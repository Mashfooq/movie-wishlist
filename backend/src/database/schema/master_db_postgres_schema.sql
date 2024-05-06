CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX username_idx ON users (username);
CREATE INDEX full_name_idx ON users (full_name);
CREATE INDEX email_idx ON users (email);

-- Define the enum type
CREATE TYPE movie_type AS ENUM ('movie', 'series', 'episode');

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  imdb_ID VARCHAR(255) UNIQUE NOT NULL,
  type movie_type,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(255) NOT NULL,
  full_response JSON NOT NULL
);

-- Create an index for the imdb_ID column
CREATE INDEX idx_imdb_id ON movies (imdb_ID);

-- Create an index for the title column
CREATE INDEX idx_movie_title ON movies (title);

-- Create an index for the title and year column
CREATE INDEX idx_movie_title_year ON movies (title, year);

-- Create an index for the id and year column
CREATE INDEX idx_movie_id_year ON movies (id, year);

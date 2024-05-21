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

CREATE TABLE movie_data (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER UNIQUE NOT NULL,
    adult BOOLEAN,
    genre_ids INTEGER[],
    original_language VARCHAR(10),
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    overview TEXT,
    popularity NUMERIC(10,3),
    backdrop_path VARCHAR(255),
    poster_path VARCHAR(255),
    release_date DATE,
    video BOOLEAN,
    vote_average NUMERIC(5,3),
    vote_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_title ON movie_data (title);
CREATE INDEX idx_movie_id ON movie_data (movie_id);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    movie_data_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    FOREIGN KEY (movie_data_id) REFERENCES movie_data(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE INDEX idx_movie_user_id ON wishlist (movie_data_id, user_id);
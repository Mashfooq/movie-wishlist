import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiErrors } from "../utils/ApiErrors.js";

import { MovieData } from "../models/movieData.model.js"

const saveMovie = asyncHandler(async (req, res) => {

    const { movie_id, title } = req.body;

    if (!movie_id || !title || title.trim() === '') {
        return res.json(new ApiErrors(400, "Essential: movie id and title❗"));
    }

    const moviesDetail = await MovieData.findOne({ where: { movie_id: movie_id } });

    if (moviesDetail) {
        return res.json(new ApiErrors(404, "Yo, this movie deets already in the system 🎥✨"));
    }

    const movieReqData = {
        movie_id: req.body.movie_id,
        adult: req.body.adult,
        backdrop_path: req.body.backdrop_path,
        genre_ids: req.body.genre_ids,
        original_language: req.body.original_language,
        original_title: req.body.original_title,
        overview: req.body.overview,
        popularity: req.body.popularity,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
        title: req.body.title,
        video: req.body.video,
        vote_average: req.body.vote_average,
        vote_count: req.body.vote_count
    };

    // Create a new user
    MovieData.create(movieReqData)
        .then(user => {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        {
                            movieDetail: movieReqData
                        },
                        "Yo, The movie deets successfully snagged in.👍🎉"
                    )
                )
        })
});

export {
    saveMovie
}
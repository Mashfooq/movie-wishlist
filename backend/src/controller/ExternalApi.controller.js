import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { getOptionsForAxiosRequest } from "./externalApiController/ExternalApiUtils.js";
import axios from 'axios';

const getMoviesByTitle = asyncHandler(async (req, res) => {

  const response = getOptionsForAxiosRequest(req.body);

  if (!response.success) {
    return res.status(response.statusCode).json(new ApiErrors(response.statusCode, response.message));
  }

  axios
    .request(response.options)
    .then(function (response) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            {
              movies: response.data
            },
            "Movies in the bag! 🍿 Let the binge-watching begin! 🎉"
          )
        )
    })
    .catch(function (error) {
      return res.status(503).json(new ApiErrors(503, "Oops! Our servers are on strike 🛑. We'll get 'em back to work!"));
      console.error(error);
    });
})

export {
  getMoviesByTitle
}


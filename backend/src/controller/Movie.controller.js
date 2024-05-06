import { asyncHandler } from "../utils/asyncHandler.js"

const saveMovie = asyncHandler(async (req, res) => {
    console.log("Saved");
});

export {
    saveMovie
}
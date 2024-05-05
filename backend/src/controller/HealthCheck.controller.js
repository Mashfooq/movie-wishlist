import { asyncHandler } from "../utils/asyncHandler.js"

const healthCheck = asyncHandler(async (_req, res) => {
    // Respond with an "OK" status and a message
    res.status(200).json({ message: "No worries here!🫡 Health status: all good!👌" });
})

export {
    healthCheck
}

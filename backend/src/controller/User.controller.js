// import utils
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.model.js";
import { Op } from 'sequelize';
import { bcryptPassword, excludeSensitiveInfo, generateAccessAndRefereshTokens, httpOnlyAndSecureOption, validatePassword } from "../utils/ApplicationUtils.js";

const userLogin = asyncHandler(async (req, res) => {
    const { userEmail, password } = req.body;

    if (!userEmail || !password || userEmail.trim() === '' || password.trim() === '') {
        return res.json(new ApiErrors(400, "Essential: email, password! 🗝️"));
    }

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
        return res.json(new ApiErrors(404, "This user's a mythical creature, nowhere to be found! 🦄"));
    }

    const isPasswordValid = await validatePassword( password, user.password);

    if (!isPasswordValid) {
        return res.json(new ApiErrors(401, "Yikes! Those credentials didn't pass the vibe check! 😬 Let's recalibrate! 🔄"));
    }

    const { newAccessToken, newRefreshToken } = generateAccessAndRefereshTokens(user);

    // Assign refresh token to current user.
    user.refresh_token = newRefreshToken;

    // Save the changes to the database
    try {
        const savedUser = await user.save();

        return res
            .status(200)
            .cookie("accessToken", newAccessToken, httpOnlyAndSecureOption())
            .json(
                new ApiResponse(
                    200,
                    {
                        user: excludeSensitiveInfo(savedUser.toJSON()), newAccessToken
                    },
                    "Woot! You've cracked the code 🛡️, Logged in like a champ! 🎉"
                )
            )

    } catch (error) {
        return res.json(new ApiErrors(500, "Uh-oh! Something went haywire when jazzing up your deets. 🤦‍♂️ We're on it!", error));
    }
})

const userSignUp = asyncHandler(async (req, res) => {
    const { userEmail, userName, userFullName, password } = req.body;

    if (!userEmail || !userName || !userFullName || !password ||
        userEmail.trim() === '' || userName.trim() === '' ||
        userFullName.trim() === '' || password.trim() === '')
    {
        return res.json(new ApiErrors(400, "Some feilds are missing!📃"));
    }

    const userDetail = await User.findOne({
        where: {
            [Op.or]: [
                { email: userEmail },
                { username: userName }
            ]
        }
    });

    if (userDetail) {
        return res.json(new ApiErrors(400, "Sorry, champ! That username's taken! 🏆😕"));
    }

    // Bcrypt the user entered password.
    const hashedPassword = await bcryptPassword(password);

    // Create a new user
    User.create({
        username: userName,
        email: userEmail,
        full_name: userFullName,
        password: hashedPassword
    }).then(user => {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: excludeSensitiveInfo(user.toJSON())
                    },
                    "Smooth sailing! 🌊 User successfully signed up! 🎉"
                )
            )
    })
});

export {
    userLogin,
    userSignUp
}
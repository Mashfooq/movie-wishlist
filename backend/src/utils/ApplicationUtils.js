import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

const excludeSensitiveInfo = (userInfo) => {
    const { password, refresh_token, ...userWithoutSensitiveData } = userInfo;

    return userWithoutSensitiveData;
}

const bcryptPassword = async (password) => {
    // Hash the password
    return await bcrypt.hash(password, 10);
}

const validatePassword = async (enteredPassword, hashedPassword) => {
    try {
        // Compare the entered password with the hashed password
        return await bcrypt.compare(enteredPassword, hashedPassword);
    } catch (error) {
        // Handle any errors that occur during the comparison process
        return error;
    }
}

const httpOnlyAndSecureOption = () => {
    return {
        httpOnly: true,
        secure: true
    }
}

const generateAccessAndRefereshTokens = (user) => {
    try {
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user.id);

        return { newAccessToken, newRefreshToken }

    } catch (error) {
        return error;
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            userEmail: user.email,
            userName: user.username
        },
        process.env.ACCESS_AUTH_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = (userId) => {
    return jwt.sign(
        {
            id: userId,

        },
        process.env.REFRESH_AUTH_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const getExternalApiAuthorizationKey = () => {
    // Check if authorization key exists.
    if (!process.env.TMDB_AUTHORIZATION_KEY) {
        return null;
    }

    // Prepare an authorization key
    return 'Bearer ' + process.env.TMDB_AUTHORIZATION_KEY;
}

const getExternalApiDomain = () => {
    // Check if domain exists.
    if (!process.env.EXTERNAL_API_DOMAIN) {
        return null;
    }

    return process.env.EXTERNAL_API_DOMAIN;
}

const getExternalApiVersion = () => {
    // Check if domain exists.
    if (!process.env.EXTERNAL_API_VERSION) {
        return null;
    }

    return process.env.EXTERNAL_API_VERSION;
}


export {
    excludeSensitiveInfo,
    bcryptPassword,
    validatePassword,
    httpOnlyAndSecureOption,
    generateAccessAndRefereshTokens,
    generateAccessToken,
    generateRefreshToken,
    getExternalApiAuthorizationKey,
    getExternalApiDomain,
    getExternalApiVersion
}
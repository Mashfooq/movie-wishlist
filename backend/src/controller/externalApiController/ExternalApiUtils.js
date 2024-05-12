import { ApiErrors } from "../../utils/ApiErrors.js";
import { getExternalApiAuthorizationKey, getExternalApiDomain, getExternalApiVersion } from "../../utils/ApplicationUtils.js";

const getOptionsForAxiosRequest = (req, res) => {
    // Get the authorization key.
    const authorizationKey = getExternalApiAuthorizationKey();

    if (!authorizationKey) {
        return new ApiErrors(400, "Essential: Authorization key❗");
    }

    if (!req.title || req.title.trim() === '') {
        return new ApiErrors(400, "Essential: Movie Title❗");
    }

    // Prepare a query string to be requested.
    const query = "query=" + encodeURIComponent(req.title) +
        "&include_adult=" + (req.include_adult ? req.include_adult : 'false') +
        "&language=" + (req.language ? req.language : 'en-US') +
        "&page=" + (req.page ? req.page : 1);

    const url = getExternalApiDomain() + "/" + getExternalApiVersion() + "/" + "search/movie" + "?" + query;

    return {
        success: true,
        options: {
            method: 'GET',
            url: url,
            headers: {
                accept: 'application/json',
                Authorization: authorizationKey
            }
        }
    };
};


export {
    getOptionsForAxiosRequest
}
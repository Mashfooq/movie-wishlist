import { Router } from 'express';
import { getMoviesByTitle } from '../controller/ExternalApi.controller.js';

const router = Router();

router.route('/searchMovies').get(getMoviesByTitle);

export default router
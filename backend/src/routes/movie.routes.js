import { Router } from 'express';

// import controller
import { saveMovie } from "../controller/Movie.controller.js"

// Declare routers
const router = Router();

router.route('/saveMovie').post(saveMovie);

export default router
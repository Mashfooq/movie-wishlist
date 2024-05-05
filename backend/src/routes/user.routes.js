import { Router } from 'express';

// import controller
import { userLogin, userSignUp } from "../controller/User.controller.js"

// Declare routers
const router = Router();

router.route('/signIn').post(userLogin);
router.route('/signUp').post(userSignUp);

export default router
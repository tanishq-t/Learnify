import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken,getCurrentUser,sendVerification } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/send-verification").post(sendVerification)
router.route("/signup").post(registerUser)
router.route("/signin").post(loginUser)


//Secured Routes
router.route("/signout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/getUser").get(verifyJWT, getCurrentUser)


export default router
import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken,getCurrentUser,sendVerification,accountRecovery,changePassword,uploadImage, updateAccountDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/send-verification").post(sendVerification)
router.route("/signup").post(registerUser)
router.route("/signin").post(loginUser)
router.post("/account-recovery", accountRecovery);
router.post("/changePassword",changePassword );


//Secured Routes
router.route("/signout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/getUser").get(verifyJWT, getCurrentUser)
router.route("/upload-profile").post(upload.single("profileImage"),verifyJWT,uploadImage)
router.route("/update-user").post(verifyJWT,updateAccountDetails)


export default router
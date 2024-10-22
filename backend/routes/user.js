import express from "express";
const router = express.Router();
import { registerValidator, loginValidator, validateHandler, sendRequestValidator,acceptRequestValidator } from "../middlewares/validators.js";

import { multerUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { login, newUser, getMyProfile, logout, searchUser, sendFriendRequest, acceptFriendRequest, getAllNotifications, getMyFriends } from "../controllers/user.js"; 


router.post( "/new", multerUpload.single("avatar") , registerValidator(), validateHandler, newUser);
router.post( "/login", loginValidator(), validateHandler, login);


// After here user must be Logged in to access the routes

//check authentication (middleware)
router.use(isAuthenticated);

router.get( "/me", getMyProfile);

router.get("/logout", logout);

router.get("/search", searchUser);

router.post("/sendrequest", sendRequestValidator(), validateHandler, sendFriendRequest);

router.post("/acceptrequest", acceptRequestValidator(), validateHandler, acceptFriendRequest);

router.get("/notifications", getAllNotifications);

router.get("/friends", getMyFriends);

export default router;




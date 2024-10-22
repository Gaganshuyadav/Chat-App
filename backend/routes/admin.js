import express from "express";
const router = express.Router();
import { adminLoginValidator, validateHandler} from "../middlewares/validators.js";


import { allUsers, allChats, allMessages, getDashboardStats, adminLogin, adminLogout, adminCheck } from "../controllers/admin.js";
import { adminOnly} from "../middlewares/auth.js";

router.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

router.get("/logout", adminLogout);

//only admin access this routes
router.use( adminOnly);

router.get("/", adminCheck);

router.get("/users", allUsers);

router.get("/chats", allChats);

router.get("/messages", allMessages);

router.get("/stats", getDashboardStats);

export default router;







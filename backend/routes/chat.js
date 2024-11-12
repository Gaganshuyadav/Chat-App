import express from "express";
const router = express.Router();

import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages, deleteChatMessages } from "../controllers/chat.js";
import { isAuthenticated} from "../middlewares/auth.js";
import { multerUpload } from "../middlewares/multer.js";
import { validateHandler, newGroupValidator, addMembersInGroupValidator, removeMembersValidator, sendAttachmentsValidator, chatIdValidator, nameCheckValidator } from "../middlewares/validators.js";

//authentication checked before routes
router.use( isAuthenticated);


//leave Group ,getChatDetails ,renameGroup ,deleteChat ,getMessages
router.post("/new", multerUpload.none() , newGroupValidator(), validateHandler, newGroupChat);

router.get("/my", getMyChats);

router.get("/my/groups", getMyGroups);

//members
router.put("/addMembers", addMembersInGroupValidator(), validateHandler, addMembers);

router.put("/removeMembers", removeMembersValidator(),  validateHandler, removeMembers);

router.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

//send attachments
router.post("/message", multerUpload.array("attach", 5), sendAttachmentsValidator(), validateHandler, sendAttachments);

//get messages
router.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

//get chatdetails, rename, delete
router.route("/:id")
                .get( chatIdValidator(), validateHandler, getChatDetails)
                .put( chatIdValidator(), nameCheckValidator(), validateHandler, renameGroup)
                .delete( chatIdValidator(), validateHandler, deleteChat);

//delete messages
router.delete("/message/del/:id", chatIdValidator(), validateHandler, deleteChatMessages);


export default router;









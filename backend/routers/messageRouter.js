import express from "express"
import { getAllMessages, sendMessage } from "../controllers/messageController.js";
import {isAdminAuthenticated} from '../middlewares/auth.js'
const router = express.Router();

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
     
router.post("/send" , sendMessage)
router.get("/get/allmessages",isAdminAuthenticated ,getAllMessages)



export default router;

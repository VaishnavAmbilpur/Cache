import { Router } from "express";
import signup from "./Routes/Signup";
import Login from "./Routes/Login";
import AddContent from "./Routes/AddContent";
import GetContent from "./Routes/GetContent"
import DeleteContent from "./Routes/DeleteContent";
import sharelink from "./Routes/ShareLinks";
import auth from "./Middleware/auth";
import getcontentofsharelink from "./Routes/GetContentOfShareLink";
import CreateTag from "./Routes/AddTags";
import getContentbyTags from "./Routes/GetContentbyTags";
import Logout from "./Routes/Logout";
const router = Router();

router.post('/api.v1/signup',signup);
router.post('/api.v1/login',Login);
router.post('/api.v1/logout',Logout);
router.post('/api.v1/content',auth,AddContent);
router.get('/api.v1/content',auth,GetContent);
router.delete('/api.v1/content',auth,DeleteContent);
router.post('/api.v1/tags',auth,CreateTag);
router.get('/api.v1/tags/:tags',auth,getContentbyTags);
router.post('/api.v1/brain/share',auth,sharelink);
router.get('/api.v1/brain/:sharelink',getcontentofsharelink);

export default router;

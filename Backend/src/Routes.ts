import { Router } from "express";
import signup from "./Routes/Signup";
import Login from "./Routes/Login";
import AddContent from "./Routes/AddContent";
import GetContent from "./Routes/GetContent";
import DeleteContent from "./Routes/DeleteContent";
import auth from "./Middleware/auth";
import getcontentofsharelink from "./Routes/GetContentOfShareLink";
import CreateTag from "./Routes/AddTags";
import getContentbyTags from "./Routes/GetContentbyTags";
import Logout from "./Routes/Logout";
import searchContent from "./Routes/SearchContent";

const router = Router();

router.post("/api.v1/signup", signup);
router.post("/api.v1/login", Login);
router.post("/api.v1/logout", auth, Logout);

router.post("/api.v1/content", auth, AddContent);
router.get("/api.v1/content", auth, GetContent);
router.delete("/api.v1/content", auth, DeleteContent);

router.post("/api.v1/search", auth, searchContent);

router.post("/api.v1/tags", auth, CreateTag);
router.get("/api.v1/tags/:tags", auth, getContentbyTags);

export default router;

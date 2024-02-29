import { Router } from "express";
import PostController from "../controllers/PostController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/post", PostController.index);
router.post("/post", authMiddleware, PostController.store);

export default router;

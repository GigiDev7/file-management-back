import express from "express";
import usersController from "../controllers/users";

const router = express.Router();

router.post("/signin", usersController.loginUser);
router.post("/signup", usersController.registerUser);

export default router;

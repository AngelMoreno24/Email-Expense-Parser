
import express from"express";
import { login } from "../controllers/loginControllers.js";

const router = express.Router();

// Login controller route.
router.post("/", login);


export default router;

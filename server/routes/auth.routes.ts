import express from "express";
const router = express.Router();
import { login, register } from "../controller/auth.controller";

router.post("/login", login);

router.post("/register", register);

module.exports = router;

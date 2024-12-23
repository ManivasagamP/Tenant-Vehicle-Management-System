import express from "express";
import { createTenant, deleteTenant, getAllTenants, login, updateTenant } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login",login);
router.post("/tenant",createTenant);
router.get("/tenant",getAllTenants);
router.put("/tenant/:id",updateTenant);
router.delete("/tenant/:id",deleteTenant);

export default router;
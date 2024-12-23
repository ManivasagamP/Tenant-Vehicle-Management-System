import express from "express"
import { createVehicle, deleteVehicle, getVehicle, login, updateVehicle } from "../controllers/tenantController.js";


const router = express.Router();

router.post("/login",login);
router.post('/:tenantId/vehicle',createVehicle);
router.get('/:tenantId/vehicle',getVehicle);
router.put("/:tenantId/vehicle/:vehicleId",updateVehicle);
router.delete("/:tenantId/vehicle/:vehicleId",deleteVehicle);

export default router;
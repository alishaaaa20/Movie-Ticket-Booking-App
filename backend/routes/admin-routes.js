import  express from "express";
import { addAdmin, adminlogin, getAdminById, getAdmins } from "../controller/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminlogin);
adminRouter.get("/", getAdmins);
adminRouter.get("/:id", getAdminById);


export default adminRouter;
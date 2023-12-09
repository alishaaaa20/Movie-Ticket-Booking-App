import  express from "express";
import { addAdmin, adminlogin, getAdmins } from "../controller/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminlogin);
adminRouter.get("/", getAdmins);


export default adminRouter;
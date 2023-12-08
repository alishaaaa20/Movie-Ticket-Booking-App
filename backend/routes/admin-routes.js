import  express from "express";
import { addAdmin, login } from "../controller/admin-controller";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", login);

export default adminRouter;
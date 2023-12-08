import express from 'express';
import { getAllUsers } from '../controller/user-controller';

const userRouter = express.Router();


userRouter.get('/', getAllUsers);

export default userRouter;
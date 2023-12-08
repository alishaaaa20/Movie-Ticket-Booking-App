import express from 'express';
import { 
    getAllUsers, 
    signup,
    updateUser,
    deleteUser,
    login,
 } from '../controller/user-controller';

const userRouter = express.Router();


userRouter.get('/', getAllUsers);
userRouter.post('/signup', signup);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/login', login);

export default userRouter;
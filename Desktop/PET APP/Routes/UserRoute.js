import express from 'express';
import {  loginUser, registerUser, allUsers,changePassword,makeUserAdmin,deleteuser } from '../Controllers/UsersController.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser)
router.get('/allusers',allUsers)
router.post('/changePassword', changePassword);
router.put("/admin/:userId", makeUserAdmin);
router.delete('/delete/:userId',deleteuser)

export default router;
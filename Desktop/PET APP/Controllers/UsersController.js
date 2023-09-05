import userModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../Utilities/JwtAuth.js';
import asyncHandler from '../Utilities/aysnchandler.js';
import { userErrorMessages } from '../Utilities/error.js';
import { userSuccessMessages } from '../Utilities/success.js';

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, password, phoneNo } = req.body;

    const existingUser = await userModel.findOne({ phoneNo });
    if (existingUser) {
      return res.status(400).json({ message: userErrorMessages.alreadyRegistered });
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newUser = new userModel({
      name,
      password: hashedPassword,
      phoneNo,
    });

    await newUser.save();

  
    newUser.password = undefined;

    res.status(201).json({ message: userSuccessMessages.registrationSuccess, newUser });
  } catch (error) {
    res.status(500).json({ message: userErrorMessages.registrationFailed, error: error.message });
  }
});
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { phoneNo, password } = req.body;

    const user = await userModel.findOne({ phoneNo });

    if (!user) {
      return res.status(401).json({ message: userErrorMessages.login });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: userErrorMessages.login });
    }

    const token = generateToken(user._id);

    
    user.password = undefined;
    user.phoneNo = undefined;

    const obj = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    res.status(200).json({ message: userSuccessMessages.loginSuccess, user: { ...obj, token } });
  } catch (error) {
    res.status(500).json({ message: userErrorMessages.serverError, error: error.message });
  }
});

export const allUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.status(200).json({ message: userSuccessMessages.allUsers, getUsers });
  } catch (error) {
    res.status(500).json({ message: userErrorMessages.serverError, error: error.message });
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: userErrorMessages.noUser });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: userErrorMessages.currentPassword });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: userSuccessMessages.passwordChange });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: userErrorMessages.passwordChangeFailed, error: error.message });
  }
});

export const makeUserAdmin = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { role: 'admin' },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: userErrorMessages.noUser });
    }

    res.status(200).json({ message: userSuccessMessages.admin, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: userErrorMessages.adminFailed });
  }
});

export const deleteuser = asyncHandler(async(req,res)=>{
  try {
    const userId = req.params.userId
    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).json({message:userErrorMessages.noUser})
}
if (user.role=='admin') {

  return res.status(501).json({message:userErrorMessages.adminUser})  
}
const delUser = await userModel.findByIdAndDelete(user)

res.status(201).json({message:userSuccessMessages.deleteUser,delUser})
  } catch (error) {
    res.status(500).json({message:error.message})
    
  }
})


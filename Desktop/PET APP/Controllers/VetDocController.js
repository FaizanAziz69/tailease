import VetDocModel from "../Models/VetDoc.js";
import asyncHandler from '../Utilities/aysnchandler.js'
import { vetDocErrorMessages } from "../Utilities/error.js";
import { vetDocSuccessMessages } from "../Utilities/success.js";

export const docRegistration = asyncHandler(async (req, res) => {
  try {
    const { name, officeHours, address, city, phoneNo, speciality } = req.body;

    const existingDoc = await VetDocModel.findOne({ phoneNo });

    if (existingDoc) {
      return res.status(400).json({ message: vetDocErrorMessages.alreadyRegistered });
    }

    const newDoctor = new VetDocModel({
      name,
      officeHours,
      address,
      city,
      phoneNo,
      speciality,
    });

    await newDoctor.save();

    res.status(201).json({ message: vetDocSuccessMessages.registrationSuccess, newDoctor });
  } catch (error) {
    res.status(500).json({ message: vetDocErrorMessages.registrationFailed });
  }
});

export const getAllDoctors = asyncHandler(async (req, res) => {
  try {
    const allDoctors = await VetDocModel.find();
    res.status(200).json({ allDoctors });
  } catch (error) {
    res.status(500).json({ message: vetDocErrorMessages.serverError });
  }
});

export const deleteDoctor = asyncHandler(async(req,res)=>{
  try {
    const doctorId = req.params.doctorId
    const doctor = await VetDocModel.findById(doctorId)
    if (!doctor) {
      return res.status(404).json({message:vetDocErrorMessages.notfound})
    }
    const delDoc = await VetDocModel.findByIdAndDelete(doctorId)
    res.status(200).json({message:vetDocSuccessMessages.deleteSuccess,delDoc})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})










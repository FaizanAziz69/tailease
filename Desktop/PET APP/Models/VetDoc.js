import mongoose from "mongoose";

const vetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    officeHours: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    
     
});

const VetDocModel = mongoose.model("VetDoc", vetSchema);
export default VetDocModel;
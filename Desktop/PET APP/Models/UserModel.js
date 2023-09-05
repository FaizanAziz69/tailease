import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(\+92|0)(3\d{2})(\d{7})$/.test(v);
      },
      message:"please enter valid Pakistani phoneNo",
    },
  },
    role: {
      type: String,
      default: "user",
    },
  });

  
  
  

userSchema.post('validate', function (error, doc, next) {
  if (error.name === 'ValidationError' && error.errors.phoneNo) {
    error.message = "Please enter a valid phone number";
  }
  next(error);
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
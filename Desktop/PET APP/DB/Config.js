
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect('mongodb+srv://PetApp:petapp@cluster0.u7sxjfg.mongodb.net/tailease', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 console.log(`DataBase Connected at ${connect.connection.host}`);
  } catch (error) {
    console.log("DataBase connection error",error);
    process.exit(1);
  }
};
export default connectDB
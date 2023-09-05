import mongoose from "mongoose";

const woundedAnimalSchema = mongoose.Schema({
  woundedAnimal: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
 
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
  }
});

const woundedAnimalModel = mongoose.model("Wounded Animals", woundedAnimalSchema);

export default woundedAnimalModel;






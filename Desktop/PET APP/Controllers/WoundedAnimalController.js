import asyncHandler from '../Utilities/aysnchandler.js';
import UserModel from '../Models/UserModel.js';
import woundedAnimalModel from '../Models/WoundedAnimalsModel.js';
import { woundedAnimalErrors, userErrorMessages } from '../Utilities/error.js';
import { woundedAnimalSuccessMessages } from '../Utilities/success.js';


export const createReportAnimal = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: woundedAnimalErrors.noImageFileError });
    }

    const { woundedAnimal, description,longitude,latitude } = req.body;
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: woundedAnimalErrors.userNotFoundError });
    }

    const userData = { _id: user._id, name: user.name };

    const newAnimalData = {
      woundedAnimal,
      image: req.file.filename,
      description,
      longitude,
      latitude,
      user: userData,
    };

    const newAnimal = await woundedAnimalModel.create(newAnimalData);

    

    res.status(201).json({
      message: woundedAnimalSuccessMessages.postCreated,
      newAnimalData: { newAnimalData },
    });
  } catch (error) {
    res.status(500).json({ message: woundedAnimalErrors.serverError });
  }
});

export const allWoundedAnimals = asyncHandler(async (req, res) => {
  try {
    const getWoundedAnimals = await woundedAnimalModel.find().sort({ _id: -1 });

    const animalsWithImageUrlsAndLocation = getWoundedAnimals.map(animal => {
      const { image, ...animalWithoutImage } = animal.toObject();
      if (image !== undefined && image !== null) {
        animalWithoutImage.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${image}`;
      }

      return animalWithoutImage;
    });

    res.status(200).json({
      message: woundedAnimalSuccessMessages.allPosts,
      woundedAnimals: animalsWithImageUrlsAndLocation,
    });
  } catch (error) {
    res.status(500).json({ message: woundedAnimalErrors.serverError });
  }
});






export const deleteReportedAnimal = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const deleteResult = await woundedAnimalModel.deleteOne({
      _id: postId,
      "user._id": userId,
    });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: woundedAnimalErrors.permissionDeniedError });
    }

    res.status(200).json({ message: woundedAnimalSuccessMessages.postDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: woundedAnimalErrors.unableToDelete });
  }
});

export const editReportedAnimal = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    console.log(userId, postId, "ASdasdasd");
    const { woundedAnimal, description } = req.body;
    const image = req.file;

    const post = await woundedAnimalModel.findOne({
      _id: postId,
      "user._id": userId,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found or you are not authorized to update this post" });
    }

    post.woundedAnimal = woundedAnimal;
    post.description = description;

    if (image) {
      post.image = image.path;
    }

    await post.save();

    res.status(200).json({ message: "Post updated successfully", updatedPost: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export const adminDeletePost = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.body.postId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: woundedAnimalErrors.userNotFoundError });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: userErrorMessages.permissionDenied });
    }

    const deleteResult = await woundedAnimalModel.deleteOne({ _id: postId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: woundedAnimalErrors.postNotFoundError });
    }

    res.status(200).json({ message: woundedAnimalSuccessMessages.postDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: woundedAnimalErrors.unableToDelete });
  }
});

export const postByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const woundedAnimals = await woundedAnimalModel.find({ 'user._id': userId });

    const woundedAnimalsWithImageURL = woundedAnimals.map((animal) => ({
      _id: animal._id,
      woundedAnimal: animal.woundedAnimal,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${animal.image}`,
      description: animal.description,
      longitude: animal.longitude,
      latitude: animal.latitude,
      user: animal.user,
    }));

    res.status(200).json({ woundedAnimals: woundedAnimalsWithImageURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

import express from "express";
import { createReportAnimal, allWoundedAnimals ,deleteReportedAnimal, editReportedAnimal,adminDeletePost, postByUser} from '../Controllers/WoundedAnimalController.js'
import { upload } from "../Utilities/MulterConfig.js";
const router = express.Router();

router.post("/post/:userId", upload.single("image"), createReportAnimal);
router.get('/all', allWoundedAnimals)
router.delete('/delete/:postId', deleteReportedAnimal)
router.put('/edit/:postId/:userId',editReportedAnimal)
router.delete("/adminDelete/:userId",adminDeletePost);
router.get('/userPosts/:userId',postByUser)
export default router;
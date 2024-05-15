const express = require("express");
const router = express.Router();

const {createStory,deleteStory,getstorybyfollowinguser} = require("../controllers/storyControllers");

router.route("/getstorybyfollowinguser").get(getstorybyfollowinguser);

router.route("/createstory").post(createStory);

router.route("/deletestory/:StoryId").delete(deleteStory);


module.exports = router;
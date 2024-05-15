const express = require("express");
const router = express.Router();

const {getPosts,createPost,commentPost,deletePost,likePost} = require("../controllers/postControllers");

router.route("/").get(getPosts);

router.route("/like/:PostId").put(likePost);

router.route("/createpost").post(createPost);

router.route("/:PostId").delete(deletePost);

router.route("/comment/:PostId").post(commentPost);

module.exports = router;
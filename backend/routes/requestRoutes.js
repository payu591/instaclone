const express = require("express");
const router = express.Router();

const {getRequests,createRequest,updateRequest, handleFollowRequest} = require("../controllers/requestControllers");

router.route("/").get(getRequests);

router.route("/:RequestId").put(updateRequest);

router.route("/createRequest/:ReceiverId").post(createRequest);

router.route("/followbackRequest/:ReceiverId").post(handleFollowRequest);
// router.route("/unfollowRequest/:ReceiverId").post(handleUnFollowRequest);

module.exports = router;
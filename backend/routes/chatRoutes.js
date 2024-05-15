const express = require("express");
const router = express.Router();

const { addChatMessage, getchat, getAllUserChats } = require("../controllers/chatControllers");

router.route("/getAllUserchats").get(getAllUserChats);

router.route("/:chatId").get(getchat);

router.route("/:chatId").post(addChatMessage);

module.exports = router;
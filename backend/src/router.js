const express = require("express");

const router = express.Router();

const userController = require("./controllers/userController");
const diaryController = require("./controllers/diaryController");

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.get("/diary", diaryController.getDiaries);
router.get("/diary/:id", diaryController.getOneDiary);

router.post("/diary", diaryController.createDiary);

module.exports = router;

const express = require("express");

const router = express.Router();

const userController = require("./controllers/userController");
const diaryController = require("./controllers/diaryController");
const savesController = require("./controllers/savesController");

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.put("/user/:id", userController.updateUser);
router.get("/diary", diaryController.getDiaries);
router.get("/diary/:id", diaryController.getOneDiary);
router.delete("/diary/:id", diaryController.deleteDiary);

router.get("/saves", savesController.getSaves);
router.get("/saves/:id", savesController.getOneSave);
router.put("saves/:id", savesController.updateSaves);

router.post("/diary", diaryController.createDiary);

module.exports = router;

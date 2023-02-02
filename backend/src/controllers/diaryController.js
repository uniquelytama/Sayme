/* eslint-disable camelcase */
const diaryModel = require("../models/diaryModel");

const userController = {
  updateDiary: async (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line camelcase

    /*    console.log(bio); */
    /* const hashedPassword = await passwordHash(password); */

    diaryModel
      .updateOne(req.body, id)
      .then((user) => res.send(user))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getDiaries: (req, res) => {
    diaryModel.findAll().then((users) => res.send(users));
  },

  getOneDiary: (req, res) => {
    const { id } = req.params;
    diaryModel.findOne(id).then((user) => {
      if (user[0]) {
        res.send(user[0]);
      } else {
        res.status(404).send("User not found");
      }
    });
  },
  createDiary: async (req, res) => {
    // eslint-disable-next-line camelcase
    const { user_id, content, subject } = req.body;

    diaryModel
      .createOne({
        user_id,
        content,
        subject,
      })
      .then((result) =>
        res.status(201).send({
          message: "diary created",
          id: result.insertId,
          user_id,
          content,
        })
      );
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    diaryModel.deleteOne(id).then((response) => {
      if (response.affectedRows !== 1) {
        return res.status(404).send(`user ${id} not found`);
      }
      return res.status(200).send(`user ${id} deleted`);
    });
  },
};
module.exports = userController;

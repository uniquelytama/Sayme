/* eslint-disable camelcase */
const savesModel = require("../models/savesModel");

const savesController = {
  updateSaves: async (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line camelcase

    /*    console.log(bio); */
    /* const hashedPassword = await passwordHash(password); */

    savesModel
      .updateOne(req.body, id)
      .then((save) => res.send(save))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getSaves: (req, res) => {
    savesModel.findAll().then((save) => res.send(save));
  },

  getOneSave: (req, res) => {
    const { id } = req.params;
    savesModel.findOne(id).then((save) => {
      if (save[0]) {
        res.send(save[0]);
      } else {
        res.status(404).send("User not found");
      }
    });
  },
  createSave: async (req, res) => {
    // eslint-disable-next-line camelcase
    const { user_id, content, subject } = req.body;

    savesModel
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
  deleteDiary: (req, res) => {
    const { id } = req.params;
    savesModel.deleteOne(id).then((response) => {
      if (response.affectedRows !== 1) {
        return res.status(404).send(`user ${id} not found`);
      }
      return res.status(200).send(`user ${id} deleted`);
    });
  },
};
module.exports = savesController;

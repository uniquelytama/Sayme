const userModel = require("../models/userModel");

const userController = {
  updateUser: async (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line camelcase

    /*    console.log(bio); */
    /* const hashedPassword = await passwordHash(password); */

    userModel
      .updateOne(req.body, id)
      .then((user) => res.send(user))
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getUsers: (req, res) => {
    userModel.findAll().then((users) => res.send(users));
  },

  getOneUser: (req, res) => {
    const { id } = req.params;
    userModel.findOne(id).then((user) => {
      if (user[0]) {
        res.send(user[0]);
      } else {
        res.status(404).send("User not found");
      }
    });
  },
  createUser: async (req, res) => {
    // eslint-disable-next-line camelcase
    const { username } = req.body;

    userModel
      .createOne({
        username,
      })
      .then((response) => {
        if (response.affectedRows !== 0) {
          userModel.findOne(response.insertId).then((result) =>
            res.status(201).send({
              message: "user created",
              id: result.insertId,
              username,
            })
          );
        } else {
          res.send("USER NOT CREATED");
        }
      });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    userModel.deleteOne(id).then((response) => {
      if (response.affectedRows !== 1) {
        return res.status(404).send(`user ${id} not found`);
      }
      return res.status(200).send(`user ${id} deleted`);
    });
  },
};
module.exports = userController;

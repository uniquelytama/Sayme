const database = require("../../config");

const findAll = () => {
  return database
    .promise()
    .query("SELECT * FROM user")
    .then(([res]) => res);
};
const findOne = (id) => {
  return database
    .promise()
    .query("SELECT * FROM user WHERE id =?", [Number(id)])
    .then(([res]) => res);
};
const createOne = (payload) => {
  return database
    .promise()
    .query("INSERT INTO user SET ?", [payload])
    .then(([res]) => res);
};
const deleteOne = (id) => {
  return database
    .promise()
    .query("DELETE FROM user WHERE id = ?", [id])
    .then(([res]) => res);
};
const updateOne = (payload, id) => {
  return database
    .promise()
    .query("UPDATE user SET ? WHERE id = ?", [payload, id])
    .then(([res]) => res);
};
module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne,
};

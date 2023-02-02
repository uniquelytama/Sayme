const database = require("../../config");

const findAll = () => {
  return database
    .promise()
    .query(
      "SELECT diary.id, username, content, subject FROM diary INNER JOIN user ON user.id = diary.user_id"
    )
    .then(([res]) => res);
};
const findOne = (id) => {
  return database
    .promise()
    .query("SELECT * FROM diary WHERE id =?", [Number(id)])
    .then(([res]) => res);
};
const createOne = (payload) => {
  return database
    .promise()
    .query("INSERT INTO diary SET ?", [payload])
    .then(([res]) => res);
};
const deleteOne = (id) => {
  return database
    .promise()
    .query("DELETE FROM diary WHERE id = ?", [id])
    .then(([res]) => res);
};
const updateOne = (payload, id) => {
  return database
    .promise()
    .query("UPDATE diary SET ? WHERE id = ?", [payload, id])
    .then(([res]) => res);
};
module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne,
};

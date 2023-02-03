const database = require("../../config");

const findAll = () => {
  return database
    .promise()
    .query(
      "SELECT saves.id, isSaved FROM saves INNER JOIN diary ON diary.id = saves.diary_id INNER JOIN user ON user.id = saves.user_id"
    )
    .then(([res]) => res);
};
const findOne = (id) => {
  return database
    .promise()
    .query("SELECT * FROM saves WHERE id =?", [Number(id)])
    .then(([res]) => res);
};
const createOne = (payload) => {
  return database
    .promise()
    .query("INSERT INTO saves SET ?", [payload])
    .then(([res]) => res);
};
const deleteOne = (id) => {
  return database
    .promise()
    .query("DELETE FROM saves WHERE id = ?", [id])
    .then(([res]) => res);
};
const updateOne = (payload, id) => {
  return database
    .promise()
    .query("UPDATE saves SET ? WHERE id = ?", [payload, id])
    .then(([res]) => res);
};
module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne,
};

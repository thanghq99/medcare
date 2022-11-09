const { Account } = require("../models");

//get all accounts
const getAllAccounts = async () => {
  const data = await Account.findAll();
  return data;
};

//create new account
const newAccount = async (body) => {
  const data = await Account.create(body);
  return data;
};

//update single account
const updateAccount = async (id, body) => {
  await Account.update(body, {
    where: { id: id },
  });
  return body;
};

//delete single account
const deleteAccount = async (id) => {
  await Account.destroy({ where: { id: id } });
  return "";
};

//get single account
const getAccount = async (id) => {
  const data = await Account.findByPk(id);
  return data;
};

module.exports = {
  getAllAccounts,
  newAccount,
  getAccount,
  updateAccount,
  deleteAccount,
};

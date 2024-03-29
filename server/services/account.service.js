const { Account, Staff, Patient } = require("../models");

//get all accounts
const getAllAccounts = async () => {
  const data = await Account.findAll();
  return data;
};

//create new account
const newAccount = async (body, transaction) => {
  const data = await Account.create(
    {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      phoneNumber: body.phoneNumber,
      dob: body.dob,
      gender: body.gender,
      address: body.address,
      isStaff: body.isStaff,
      isDisabled: false,
      staffDetails: {
        degreeId: body.degree,
        specialtyId: body.specialty,
        examinationFee: body.examinationFee,
        isAdmin: body.isAdmin,
      },
      patientDetails: {
        healthHistory: body.healthHistory,
        familyHealthHistory: body.familyHealthHistory,
      },
    },
    {
      include: [
        {
          model: Staff,
          as: "staffDetails",
        },
        {
          model: Patient,
          as: "patientDetails",
        },
      ],
    },
    { transaction: transaction }
  );
  return data;
};

//find or create new account
const findOrNewAccount = async (body) => {
  const [data, created] = await Account.findOrCreate({
    where: {
      email: body.email,
    },
    default: {
      ...body,
    },
  });
  return [data, created];
};

const findOneByEmail = async (email) => {
  const data = await Account.findOne({
    where: { email: email },
  });
  return data;
};

const findOneByEmailPassword = async (body) => {
  const data = await Account.findOne({
    where: {
      email: body.email,
      password: body.password,
    },
    include: [
      {
        model: Patient,
        as: "patientDetails",
      },
      {
        model: Staff,
        as: "staffDetails",
      },
    ],
    attributes: { exclude: ["password"] },
  });
  return data;
};

//update single account
const updateAccount = async (id, body) => {
  await Account.update(
    {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dob: body.dob,
      gender: body.gender,
      address: body.address,
    },
    {
      where: { id: id },
    }
  );
  return body;
};

//change password
const changePassword = async (id, password) => {
  await Account.update(
    {
      password: password,
    },
    {
      where: { id: id },
    }
  );
  return "";
};

//toggle isDisabled for both staff and patient
const toggleIsDisabled = async (id, body) => {
  await Account.update({ isDisabled: body.isDisabled }, { where: { id: id } });
  return "";
};

//delete single account
const deleteAccount = async (id) => {
  const account = Account.findByPk(id);
  if (account)
    await Account.update({ isDisabled: true }, { where: { id: id } });
  return "";
};

//get single account
const getAccount = async (id) => {
  const data = await Account.findByPk(id, {
    include: [
      {
        model: Patient,
        as: "patientDetails",
      },
      {
        model: Staff,
        as: "staffDetails",
      },
    ],
    attributes: { exclude: ["password"] },
  });
  return data;
};

module.exports = {
  getAllAccounts,
  newAccount,
  findOneByEmail,
  findOrNewAccount,
  findOneByEmailPassword,
  getAccount,
  updateAccount,
  changePassword,
  deleteAccount,
  toggleIsDisabled,
};

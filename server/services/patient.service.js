const { Patient, Account, Sequelize } = require("../models");
const Op = Sequelize.Op;
const { getPagination } = require("../utils/paginationHelper");

//get all patients
const getPatients = async (body) => {
  const getSearchNameOrPhoneNumber = () => {
    if (body.searchValue !== "")
      return Sequelize.or(
        Sequelize.where(
          Sequelize.fn(
            "concat",
            Sequelize.col("first_name"),
            Sequelize.col("last_name")
          ),
          {
            [Op.iLike]: `%${body.searchValue}%`,
          }
        ),
        Sequelize.where(
          Sequelize.col("phone_number"),
          Op.iLike,
          `%${body.searchValue}%`
        )
      );
  };

  const { limit, offset } = getPagination(body.page, body.pageSize);

  const orderSchema = {
    firstName: ["account", "firstName"],
    dob: ["account", "dob"],
    gender: ["account", "gender"],
  };

  const getOrder = () =>
    body.orderBy !== "" && body.order !== ""
      ? [[...orderSchema[`${body.orderBy}`], body.order]]
      : [];

  const getDisableFilter = () => {
    if (body.disableFilter !== "")
      return {
        is_disabled: {
          [Op.eq]: body.disableFilter,
        },
      };
    else return {};
  };

  const data = await Patient.findAndCountAll({
    attributes: {
      exclude: ["accountId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Account,
        as: "account",
        where: [
          { is_staff: false },
          getSearchNameOrPhoneNumber(),
          getDisableFilter(),
        ],
        attributes: {
          exclude: ["password", "isStaff", "createAt", "updateAt"],
        },
      },
    ],
    limit,
    offset,
    order: getOrder(),
  });
  return data;
};

//get all patients
const getAllPatients = async () => {
  const data = await Patient.findAll(body);
  return data;
};

//create new patient
const newPatient = async (body) => {
  const data = await Patient.create(body);
  return data;
};

//update single patient
const updatePatient = async (id, body) => {
  await Patient.update(
    {
      healthHistory: body.healthHistory,
      familyHealthHistory: body.familyHealthHistory,
    },
    {
      where: { id: id },
    }
  );
  return body;
};

//delete single patient
const deletePatient = async (id) => {
  await Patient.destroy({ where: { id: id } });
  return "";
};

//get single patient
const getPatient = async (id) => {
  const data = await Patient.findByPk(id, {
    attributes: {
      exclude: ["accountId", "specialtyId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Account,
        as: "account",
        where: [{ is_staff: false }],
        attributes: {
          exclude: ["password", "isStaff", "createAt", "updateAt"],
        },
      },
    ],
  });
  return data;
};

module.exports = {
  getPatients,
  getAllPatients,
  newPatient,
  getPatient,
  updatePatient,
  deletePatient,
};

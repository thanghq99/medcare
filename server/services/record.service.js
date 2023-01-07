const {
  Record,
  Staff,
  Patient,
  Account,
  Specialty,
  Sequelize,
} = require("../models");
const Op = Sequelize.Op;
const { getPagination } = require("../utils/paginationHelper");

//get all records
const getAllRecords = async (
  page,
  pageSize,
  orderBy,
  order,
  searchPatientName,
  searchStaffName,
  searchDate
) => {
  const searchStaffNameCondition = () => {
    if (searchStaffName !== "")
      return Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("first_name"),
          Sequelize.col("last_name")
        ),
        {
          [Op.iLike]: `%${searchStaffName}%`,
        }
      );
    else return;
  };
  const searchPatientNameCondition = () => {
    if (searchPatientName !== "")
      return Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("first_name"),
          Sequelize.col("last_name")
        ),
        {
          [Op.iLike]: `%${searchPatientName}%`,
        }
      );
    else return;
  };
  const searchDateCondition = () => {
    if (searchDate !== "")
      return {
        appointment_time: {
          [Op.eq]: searchDate,
        },
      };
  };
  const { limit, offset } = getPagination(page, pageSize);

  const orderSchema = {
    appointmentTime: ["appointmentTime"],
    status: ["name"],
  };

  const getOrder = () =>
    orderBy !== "" && order !== ""
      ? [[...orderSchema[`${orderBy}`], order]]
      : [];

  const data = await Record.findAndCountAll({
    where: searchDateCondition(),
    include: [
      {
        model: Staff,
        as: "staff",
        include: [
          {
            model: Account,
            as: "account",
            where: searchStaffNameCondition(),
            attributes: {
              exclude: ["password", "isStaff", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Patient,
        as: "patient",
        include: [
          {
            model: Account,
            as: "account",
            where: searchPatientNameCondition(),
            attributes: {
              exclude: ["password", "isStaff", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Specialty,
        as: "specialty",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    limit,
    offset,
    order: getOrder(),
  });
  return data;
};

//create new record
const newRecord = async (
  staffId,
  patientId,
  specialtyId,
  appointmentTime,
  reason
) => {
  const data = await Record.create({
    staffId: staffId,
    patientId: patientId,
    specialtyId: specialtyId,
    appointmentTime: appointmentTime,
    reason: reason,
  });
  return data;
};

//update single record
const updateRecord = async (
  id,
  staffId,
  specialtyId,
  status,
  appointmentTime,
  reason,
  clinicalInformation,
  height,
  weight,
  bloodPressure,
  heartRate,
  respirationRate,
  temperature,
  diagnose,
  treatmentDirection
) => {
  await Record.update(
    {
      staffId: staffId,
      specialtyId: specialtyId,
      status: status,
      appointmentTime: appointmentTime,
      reason: reason,
      clinicalInformation: clinicalInformation,
      height: height,
      weight: weight,
      bloodPressure: bloodPressure,
      heartRate: heartRate,
      respirationRate: respirationRate,
      temperature: temperature,
      diagnose: diagnose,
      treatmentDirection: treatmentDirection,
    },
    {
      where: { id: id },
    }
  );
  return "";
};

//delete single record
const deleteRecord = async (id) => {
  await Record.destroy({ where: { id: id } });
  return "";
};

//get single record
const getRecord = async (id) => {
  const data = await Record.findByPk(id, {
    include: [
      {
        model: Staff,
        as: "staff",
        include: [
          {
            model: Account,
            as: "account",
            attributes: {
              exclude: ["password", "isStaff", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Patient,
        as: "patient",
        include: [
          {
            model: Account,
            as: "account",
            attributes: {
              exclude: ["password", "isStaff", "createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Specialty,
        as: "specialty",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });
  return data;
};

module.exports = {
  getAllRecords,
  newRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};

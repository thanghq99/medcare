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
  searchSpecialty,
  searchPatient,
  searchStaff,
  searchDate
) => {
  const searchSpecialtyCondition = () => {
    if (searchSpecialty !== null) {
      return {
        specialty_id: {
          [Op.eq]: searchSpecialty,
        },
      };
    } else {
      return {};
    }
  };
  const searchStaffCondition = () => {
    if (searchStaff !== null) {
      return {
        staff_id: {
          [Op.eq]: searchStaff,
        },
      };
    } else {
      return {};
    }
  };
  const searchPatientCondition = () => {
    if (searchPatient !== null) {
      return {
        patient_id: {
          [Op.eq]: searchPatient,
        },
      };
    } else {
      return {};
    }
  };
  const searchDateCondition = () => {
    if (searchDate !== "")
      return {
        appointment_date: {
          [Op.eq]: searchDate,
        },
      };
    else return {};
  };
  const { limit, offset } = getPagination(page, pageSize);

  const orderSchema = {
    appointmentDate: ["appointmentDate"],
    status: ["status"],
  };

  const getOrder = () =>
    orderBy !== "" && order !== ""
      ? [[...orderSchema[`${orderBy}`], order]]
      : [];

  const data = await Record.findAndCountAll({
    where: [
      searchDateCondition(),
      searchSpecialtyCondition(),
      searchStaffCondition(),
      searchPatientCondition(),
    ],
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
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
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
  appointmentDate,
  appointmentTime,
  reason
) => {
  const data = await Record.create({
    staffId: staffId,
    patientId: patientId,
    specialtyId: specialtyId,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
    reason: reason,
  });
  return data;
};

const updateRecord = async (id, body) => {
  await Record.update(body, {
    where: { id: id },
  });
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
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
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

const { Staff, Account, Specialty, Sequelize } = require("../models");
const Op = Sequelize.Op;
const { getPagination } = require("../utils/paginationHelper");

//get all staffs
const getAllStaffs = async (body) => {
  const getSearchName = () => {
    if (body.searchName !== "")
      return Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("first_name"),
          Sequelize.col("last_name")
        ),
        {
          [Op.iLike]: `%${body.searchName}%`,
        }
      );
    else return;
  };

  const getDegreeFilter = () => {
    if (body.degreeFilter !== "")
      return {
        degree: {
          [Op.iLike]: `%${body.degreeFilter}%`,
        },
      };
    else return {};
  };

  const getSpecialtyFilter = () => {
    if (body.specialtyFilter !== "")
      return {
        specialty_id: {
          [Op.eq]: body.specialtyFilter,
        },
      };
    else return {};
  };

  const getDisableFilter = () => {
    if (body.disableFilter !== "")
      return {
        is_disabled: {
          [Op.eq]: body.disableFilter,
        },
      };
    else return {};
  };

  const { limit, offset } = getPagination(body.page, body.pageSize);

  const orderSchema = {
    firstName: ["account", "firstName"],
    specialtyName: ["specialty", "name"],
    degree: ["degree"],
    examinationFee: ["examinationFee"],
  };

  const getOrder = () =>
    body.orderBy !== "" && body.order !== ""
      ? [[...orderSchema[`${body.orderBy}`], body.order]]
      : [];

  const data = await Staff.findAndCountAll({
    where: [getDegreeFilter(), getSpecialtyFilter()],
    attributes: {
      exclude: ["accountId", "specialtyId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Account,
        as: "account",
        where: [{ is_staff: true }, getSearchName(), getDisableFilter()],
        attributes: {
          exclude: ["password", "isStaff", "createdAt", "updatedAt"],
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

//create new staff
const newStaff = async (body) => {
  const data = await Staff.create(body);
  return data;
};

//update single staff
const updateStaff = async (id, body) => {
  await Staff.update(
    {
      degree: body.degree,
      examinationFee: body.examinationFee,
      specialtyId: body.specialtyId,
    },
    {
      where: { id: id },
    }
  );
  return body;
};

//delete single staff
const deleteStaff = async (id) => {
  await Staff.destroy({ where: { id: id } });
  return "";
};

//get single staff
const getStaff = async (id) => {
  const data = await Staff.findByPk(id, {
    attributes: {
      exclude: ["accountId", "specialtyId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Account,
        as: "account",
        where: [{ is_staff: true }],
        attributes: {
          exclude: ["password", "isStaff", "createdAt", "updatedAt"],
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
  getAllStaffs,
  newStaff,
  getStaff,
  updateStaff,
  deleteStaff,
};

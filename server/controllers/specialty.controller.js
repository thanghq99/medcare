const { StatusCodes } = require("http-status-codes");
const SpecialtyService = require("../services/specialty.service.js");

/** Controller to get all specialties available */
const getAllSpecialties = async (req, res, next) => {
  try {
    const data = await SpecialtyService.getAllSpecialties();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All specialties fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single specialty */
const getSpecialty = async (req, res, next) => {
  try {
    const data = await SpecialtyService.getSpecialty(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Specialty fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new specialty */
const newSpecialty = async (req, res, next) => {
  try {
    const data = await SpecialtyService.newSpecialty(req.body.name);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Specialty created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a specialty */
const updateSpecialty = async (req, res, next) => {
  try {
    const data = await SpecialtyService.updateSpecialty(
      req.params.id,
      req.body.name
    );
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Specialty updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single specialty */
const deleteSpecialty = async (req, res, next) => {
  try {
    await SpecialtyService.deleteSpecialty(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Specialty deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSpecialties,
  newSpecialty,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
};

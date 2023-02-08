const { StatusCodes } = require("http-status-codes");
const DegreeService = require("../services/degree.service.js");

/** Controller to get all degrees available */
const getAllDegrees = async (req, res, next) => {
  try {
    const data = await DegreeService.getAllDegrees();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All degrees fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single degree */
const getDegree = async (req, res, next) => {
  try {
    const data = await DegreeService.getDegree(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Degree fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new degree */
const newDegree = async (req, res, next) => {
  try {
    const data = await DegreeService.newDegree(req.body.name);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Degree created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a degree */
const updateDegree = async (req, res, next) => {
  try {
    const data = await DegreeService.updateDegree(req.params.id, req.body.name);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Degree updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single degree */
const deleteDegree = async (req, res, next) => {
  try {
    await DegreeService.deleteDegree(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Degree deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDegrees,
  newDegree,
  getDegree,
  updateDegree,
  deleteDegree,
};

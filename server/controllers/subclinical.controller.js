const { StatusCodes } = require("http-status-codes");
const SubclinicalService = require("../services/subclinical.service.js");

/** Controller to get all subclinicals available */
const getAllSubclinicals = async (req, res, next) => {
  try {
    const data = await SubclinicalService.getAllSubclinicals();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All subclinicals fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single subclinical */
const getSubclinical = async (req, res, next) => {
  try {
    const data = await SubclinicalService.getSubclinical(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Subclinical fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new subclinical */
const newSubclinical = async (req, res, next) => {
  try {
    const data = await SubclinicalService.newSubclinical(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Subclinical created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a subclinical */
const updateSubclinical = async (req, res, next) => {
  try {
    const data = await SubclinicalService.updateSubclinical(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Subclinical updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single subclinical */
const deleteSubclinical = async (req, res, next) => {
  try {
    await SubclinicalService.deleteSubclinical(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Subclinical deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSubclinicals,
  newSubclinical,
  getSubclinical,
  updateSubclinical,
  deleteSubclinical,
};

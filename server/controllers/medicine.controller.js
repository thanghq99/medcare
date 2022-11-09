const { StatusCodes } = require("http-status-codes");
const MedicineService = require("../services/Medicine.service.js");

/** Controller to get all Medicines available */
const getAllMedicines = async (req, res, next) => {
  try {
    const data = await MedicineService.getAllMedicines();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All Medicines fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single Medicine */
const getMedicine = async (req, res, next) => {
  try {
    const data = await MedicineService.getMedicine(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Medicine fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new Medicine */
const newMedicine = async (req, res, next) => {
  try {
    const data = await MedicineService.newMedicine(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Medicine created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a Medicine */
const updateMedicine = async (req, res, next) => {
  try {
    const data = await MedicineService.updateMedicine(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Medicine updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single Medicine */
const deleteMedicine = async (req, res, next) => {
  try {
    await MedicineService.updateMedicine(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMedicines,
  newMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine,
};

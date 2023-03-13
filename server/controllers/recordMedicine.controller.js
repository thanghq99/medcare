const { StatusCodes } = require("http-status-codes");
const RecordMedicineService = require("../services/recordMedicine.service.js");
const RecordService = require("../services/record.service.js");
const MedicineService = require("../services/medicine.service");

/** Controller to get all recordMedicines available */
const getAllRecordMedicines = async (req, res, next) => {
  try {
    const data = await RecordMedicineService.getAllRecordMedicines(
      req.body.recordId
    );
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All recordMedicines fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single recordMedicine */
const getRecordMedicine = async (req, res, next) => {
  try {
    const data = await RecordMedicineService.getRecordMedicine(req.params.id);
    if (data === null) {
      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        data: data,
        message: "No RecordMedicine with given id found",
      });
    } else {
      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        data: data,
        message: "RecordMedicine fetched successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new recordMedicine */
const newRecordMedicine = async (req, res, next) => {
  try {
    const record = await RecordService.getRecord(req.body.recordId);
    const medicine = await MedicineService.getMedicine(req.body.medicineId);
    if (record !== null && medicine !== null) {
      const existingRecordMedicine =
        await RecordMedicineService.getRecordMedicineByRecordAndMedicine(
          req.body
        );
      if (existingRecordMedicine === null) {
        const data = await RecordMedicineService.newRecordMedicine(req.body);
        res.status(StatusCodes.CREATED).json({
          code: StatusCodes.CREATED,
          data: data,
          message: "RecordMedicine created successfully",
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          data: existingRecordMedicine,
          message: "This medicine is already included in this record",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        data: null,
        message: "No record or medicine with given id found",
      });
    }
  } catch (error) {
    next(error);
  }
};

/** Controller to update a recordMedicine */
const updateRecordMedicine = async (req, res, next) => {
  try {
    const data = await RecordMedicineService.updateRecordMedicine(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "RecordMedicine updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single recordMedicine */
const deleteRecordMedicine = async (req, res, next) => {
  try {
    await RecordMedicineService.deleteRecordMedicine(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "RecordMedicine deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecordMedicines,
  newRecordMedicine,
  getRecordMedicine,
  updateRecordMedicine,
  deleteRecordMedicine,
};

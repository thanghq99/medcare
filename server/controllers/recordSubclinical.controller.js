const { StatusCodes } = require("http-status-codes");
const RecordSubclinicalService = require("../services/recordSubclinical.service.js");
const RecordService = require("../services/record.service.js");
const SubclinicalService = require("../services/subclinical.service");

/** Controller to get all recordSubclinicals available */
const getAllRecordSubclinicals = async (req, res, next) => {
  try {
    const data = await RecordSubclinicalService.getAllRecordSubclinicals(
      req.body.recordId
    );
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All recordSubclinicals fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single recordSubclinical */
const getRecordSubclinical = async (req, res, next) => {
  try {
    const data = await RecordSubclinicalService.getRecordSubclinical(
      req.params.id
    );
    if (data === null) {
      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        data: data,
        message: "No RecordSubclinical with given id found",
      });
    } else {
      res.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        data: data,
        message: "RecordSubclinical fetched successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new recordSubclinical */
const newRecordSubclinical = async (req, res, next) => {
  try {
    const record = await RecordService.getRecord(req.body.recordId);
    const subclinical = await SubclinicalService.getSubclinical(
      req.body.subclinicalId
    );
    if (record !== null && subclinical !== null) {
      const existingRecordSubclinical =
        await RecordSubclinicalService.getRecordSubclinicalByRecordAndSubclinical(
          req.body
        );
      if (existingRecordSubclinical === null) {
        const data = await RecordSubclinicalService.newRecordSubclinical(
          req.body
        );
        res.status(StatusCodes.CREATED).json({
          code: StatusCodes.CREATED,
          data: data,
          message: "RecordSubclinical created successfully",
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          code: StatusCodes.BAD_REQUEST,
          data: existingRecordSubclinical,
          message: "This subclinical is already included in this record",
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        data: null,
        message: "No record or subclinical with given id found",
      });
    }
  } catch (error) {
    next(error);
  }
};

/** Controller to update a recordSubclinical */
const updateRecordSubclinical = async (req, res, next) => {
  try {
    const data = await RecordSubclinicalService.updateRecordSubclinical(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "RecordSubclinical updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single recordSubclinical */
const deleteRecordSubclinical = async (req, res, next) => {
  try {
    await RecordSubclinicalService.deleteRecordSubclinical(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "RecordSubclinical deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecordSubclinicals,
  newRecordSubclinical,
  getRecordSubclinical,
  updateRecordSubclinical,
  deleteRecordSubclinical,
};

const { StatusCodes } = require("http-status-codes");
const DemoService = require("../services/demo.service.js");

/** Controller to get all demos available */
const getAllDemos = async (req, res, next) => {
  try {
    const data = await DemoService.getAllDemos();
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "All demos fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to get a single demo */
const getDemo = async (req, res, next) => {
  try {
    const data = await DemoService.getDemo(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: data,
      message: "Demo fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to create a new demo */
const newDemo = async (req, res, next) => {
  try {
    const data = await DemoService.newDemo(req.body);
    res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      data: data,
      message: "Demo created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to update a demo */
const updateDemo = async (req, res, next) => {
  try {
    const data = await DemoService.updateDemo(req.params.id, req.body);
    res.status(StatusCodes.ACCEPTED).json({
      code: StatusCodes.ACCEPTED,
      data: data,
      message: "Demo updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** Controller to delete a single demo */
const deleteDemo = async (req, res, next) => {
  try {
    await DemoService.updateDemo(req.params.id);
    res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      data: [],
      message: "Demo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDemos,
  newDemo,
  getDemo,
  updateDemo,
  deleteDemo,
};

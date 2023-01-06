const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const defaultDate = dayjs("2000-01-01T00:00:00Z").utc();

module.exports = { defaultDate };

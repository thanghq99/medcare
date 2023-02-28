import dayjs from "dayjs";

const getDayjsDate = (time) => {
  let h = parseInt(time.slice(0, 2));
  let m = parseInt(time.slice(3, 5));
  let s = parseInt(time.slice(6, 8));

  let dayjsDate = dayjs().hour(h).minute(m).second(s);
  return dayjsDate;
};

export { getDayjsDate };

import dayjs from "dayjs";
import { getDayjsDate } from "./timePickerFormatter";

// have to use dayjs because i dont know/check if the month has 28, 29, 30 or 31 days
const getAllDatesInOneMonthFromCurrentDate = () => {
  const firstDay = dayjs().format("YYYY-MM-DD");
  const lastDay = dayjs().add(1, "month").format("YYYY-MM-DD");
  const dateList = [];
  let addAmount = 0;

  while (!dayjs(firstDay).add(addAmount, "day").isSame(dayjs(lastDay))) {
    dateList.push(dayjs(firstDay).add(addAmount, "day").format("YYYY-MM-DD"));
    addAmount = addAmount + 1;
  }
  return dateList;
};

// get all dates that have at least one shift so the patient can pick that date for the appointment
const getAvailableDates = (shiftAssignments) => {
  let availableDates = [];
  shiftAssignments.forEach((checkingShift) => {
    if (
      availableDates.findIndex(
        (checkingDate) => checkingDate === checkingShift
      ) < 0
    )
      availableDates.push(checkingShift.date);
  });
  return availableDates;
};

const getAvailableTimesOfEachShiftAssignment = (shiftAssignment) => {
  const startTime = getDayjsDate(shiftAssignment.shift.startTime);
  const endTime = getDayjsDate(shiftAssignment.shift.endTime);

  let roundedStartTime = startTime;
  if (startTime.minute() > 0 && startTime.minute() < 30) {
    roundedStartTime = startTime.minute(30);
  } else if (startTime.minute() > 30 && startTime.minute() <= 59) {
    roundedStartTime = startTime.add(1, "hour").minute(0);
  }

  let roundedEndTime = endTime;
  if (endTime.minute() >= 0 && endTime.minute() < 30) {
    roundedEndTime = endTime.subtract(1, "hour").minute(30);
  } else if (endTime.minute() >= 30 && endTime.minute() <= 59) {
    roundedEndTime = endTime.minute(0);
  }

  const diffInMinutes = roundedEndTime.diff(roundedStartTime, "minute");
  const diffInIntervals = Math.ceil(diffInMinutes / 30);

  const times = [];
  for (let i = 0; i <= diffInIntervals; i++) {
    const time = roundedStartTime.add(i * 30, "minute").format("HH:mm");
    times.push(time);
  }
  return times;
};

const getAvailableTimes = (shiftAssignments, date) => {
  const filteredshiftAssignments = shiftAssignments.filter((sa) => {
    return sa.date === date;
  });
  let availableTimes = [];
  filteredshiftAssignments.forEach((checkingShiftAssignment) => {
    let tempAvailableTimes = getAvailableTimesOfEachShiftAssignment(
      checkingShiftAssignment
    );
    availableTimes = availableTimes.concat(tempAvailableTimes);
  });
  availableTimes = [...new Set(availableTimes)];

  return availableTimes.sort();
};

export {
  getAllDatesInOneMonthFromCurrentDate,
  getAvailableDates,
  getAvailableTimes,
  getAvailableTimesOfEachShiftAssignment,
};

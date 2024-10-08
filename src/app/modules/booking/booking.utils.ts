import checkIsSlotBooked from "../../utils/check-coflict-time";
import stringToMuniteInNumber from "../../utils/string-to-mimute-in-number";
import { TBooking } from "./booking.interface";

// creat calculatePayableAmount function
export function calculatePayableAmount(
  startTime: string,
  endTime: string,
  perHour: number,
) {
  // Convert the hours and minutes into minutes
  const startMinutes = stringToMuniteInNumber(startTime);
  const endMinutes = stringToMuniteInNumber(endTime);

  // Calculate the time difference in minutes
  const timeDiffInMinutes = endMinutes - startMinutes;

  // Convert the time difference back to hours and minutes
  const hours = timeDiffInMinutes / 60;

  // Return the payableAmount
  return hours * perHour;
}

// creat isTimeConflict function
export const isTimeConflict = (
  bookingsFromDB: TBooking[],
  bookingFromCLient: TBooking,
) => {
  for (let i = 0; i < bookingsFromDB.length; i++) {
    // each booking
    const eachBooking = bookingsFromDB[i];

    const isConflict = checkIsSlotBooked(
      bookingFromCLient.startTime,
      eachBooking.startTime,
    );

    if (isConflict) {
      return true;
    }
  }
  return false;
};

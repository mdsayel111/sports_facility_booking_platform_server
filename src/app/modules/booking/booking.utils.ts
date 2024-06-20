import { TBooking } from "./booking.interface";

// creat stringToMuniteInNumber function
const stringToMuniteInNumber = (time: string) => {
  // hour and munite arr ["HH", "MM"]
  const hourAndMinuteArr = time.split(":");

  // Convert the hours and minutes into minutes
  const totalMinutes = parseInt(hourAndMinuteArr[0]) * 60 + parseInt(hourAndMinuteArr[1]);

  return totalMinutes
}

// creat calculatePayableAmount function
export function calculatePayableAmount(
  startTime: string,
  endTime: string,
  perHour: number,
) {

  // Convert the hours and minutes into minutes
  const startMinutes = stringToMuniteInNumber(startTime)
  const endMinutes = stringToMuniteInNumber(endTime);

  // Calculate the time difference in minutes
  const timeDiffInMinutes = endMinutes - startMinutes;


  // Convert the time difference back to hours and minutes
  const hours = timeDiffInMinutes / 60;

  // Return the payableAmount
  return hours * perHour;
}

// creat isTimeConflict function
export const isTimeConflict = (bookingsFromDB: TBooking[], bookingFromCLient: TBooking) => {
  for (let i = 0; i < bookingsFromDB.length; i++) {
    // each booking
    const eachBooking = bookingsFromDB[i]

    // start time of each booking in mumber
    const startTimeOfEachBookingInNumber = stringToMuniteInNumber(eachBooking.startTime)

    // end time of each booking in mumber
    const endTimeOfEachBookingInNumber = stringToMuniteInNumber(eachBooking.startTime)

    // start time of each booking in mumber
    const startTimeOfClientBookingInNumber = stringToMuniteInNumber(bookingFromCLient.startTime)

    // end time of each booking in mumber
    const endTimeOfClientBookingInNumber = stringToMuniteInNumber(bookingFromCLient.startTime)

    // check if time is conflict or not
    if ((startTimeOfClientBookingInNumber >= startTimeOfEachBookingInNumber && startTimeOfClientBookingInNumber < endTimeOfEachBookingInNumber) || (endTimeOfClientBookingInNumber > startTimeOfEachBookingInNumber && endTimeOfClientBookingInNumber < endTimeOfEachBookingInNumber)) {
      // means time will be conflict
      return true
    }



    // time will ne not conflict
    return false

  }
}

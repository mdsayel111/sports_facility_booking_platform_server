import checkConflictTime from "../../utils/check-coflict-time";
import { TBooking } from "../booking/booking.interface";

// creat get available slot function
export const getAvailableSlots = (bookings: TBooking[]) => {
  const slots: { startTime: string; endTime: string }[] = [];

  // creat slots
  for (let i = 0; i < 24; i += 2) {
    slots.push({
      startTime: `${i}:00`.padStart(5, "0"),
      endTime: `${i + 2}:00`.padStart(5, "0"),
    });
  }

  // if bokkings length is 0 means no bokkings in specific day, then return all slots
  if (bookings.length === 0) {
    return slots;
  }

  // check slot's time conflict or not with bokking's time,
  // if conflict remove slots from available slots
  const availableSlots = slots.filter((slot) => {
    for (let i = 0; i < bookings.length; i++) {
      const eachBooking = bookings[i];
      const isConflict = checkConflictTime(
        slot.startTime,
        slot.endTime,
        eachBooking.startTime,
        eachBooking.endTime,
      );
      if (!isConflict) {
        return true;
      }
      return false;
    }
  });

  // return available slots
  return availableSlots;
};

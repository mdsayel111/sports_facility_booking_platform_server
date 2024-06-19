// creat calculatePayableAmount function
function calculatePayableAmount(
  startTime: string,
  endTime: string,
  perHour: number,
) {
  // Parse the time string into hours and minutes
  const start = startTime.split(":");
  const end = endTime.split(":");

  // Convert the hours and minutes into minutes
  const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
  const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);

  // Calculate the time difference in minutes
  const timeDiffInMinutes = endMinutes - startMinutes;

  // Convert the time difference back to hours and minutes
  const hours = timeDiffInMinutes / 60;

  // Return the payableAmount
  return hours * perHour;
}
export default calculatePayableAmount;

export function parseFirebaseTime(dateTimeObject) {
  try {
    const milliseconds = Math.floor(
      dateTimeObject.seconds * 1000 + dateTimeObject.nanoseconds / 1000000
    );
    const date = new Date(milliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeString = `${hours}:${minutes}`;
    return timeString;
  } catch (error) {
    console.log(error);
  }
}

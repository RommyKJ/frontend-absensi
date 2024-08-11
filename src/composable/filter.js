export default function useFilter() {
  const formatDate = (input) => {
    const date = input instanceof Date ? input : new Date(input);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }
    // Array nama hari dan bulan
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format tanggal ke "Nama Hari, DD MM YYYY, HH:MM:SS"
    return `${dayName}, ${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
  };

  return {
    formatDate,
  };
}

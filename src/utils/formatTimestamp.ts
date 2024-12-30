export default function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${year}. ${month}. ${day}. `;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const period = Number(hours) >= 12 ? 'PM' : 'AM';

  return `${formattedDate}${period} ${formattedTime}`;
}

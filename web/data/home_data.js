function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function calendarLabel(date) {
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  return `${month} ${date.getDate()} ${date.getFullYear()}`;
}

const departureDate = addDays(30);
const returnDate = addDays(37);

module.exports = {
  origin: 'Manila',
  destination: 'Sydney',
  invalidDestination: 'zzzznotacity',
  departureDate,
  returnDate,
  departureLabel: calendarLabel(departureDate),
  returnLabel: calendarLabel(returnDate),
};

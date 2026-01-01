
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const years = [2026];

export const dropdownMenus = {
  monthIndex: months.map((_, i) => i),
  year: years,
  occurrence: ['Daily', 'Weekly', 'Specific Days'],
  day: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}

export const getWeeksForMonth = (monthIndex, year) => {
  const date = new Date(year, monthIndex + 1, 0); // Last day of month
  const totalDays = date.getDate();
  const weeksCount = Math.ceil(totalDays / 7); // Divide days by 7, round up
  return Array.from({ length: weeksCount }, (_, i) => `W${i + 1}`);
};

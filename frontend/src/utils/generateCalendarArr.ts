const generateCalendarArr = (year: number, month: number) => {
  const result = [];
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  for (let i = 0; i < firstDay; i++) {
    result.push('');
  }
  for (let i = 1; i <= daysInMonth; i++) {
    result.push(i);
  }

  for (let i = 0; result.length < 35; i++) {
    result.push('');
  }

  return result;
};

export const nextCalendar = (year: number, month: number) => {
  const modifiedYear = month === 11 ? year + 1 : year;
  const modifiedMonth = (month + 1) % 12;

  return [modifiedMonth, modifiedYear];
};
export const prevCalendar = (year: number, month: number) => {
  const modifiedYear = month === 0 ? year - 1 : year;
  const modifiedMonth = month === 0 ? 11 : month - 1;

  return [modifiedMonth, modifiedYear];
};

export default generateCalendarArr;

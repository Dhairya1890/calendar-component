// this file is for pure logic brain of the calendar, functions that take input and returns output
// every date calculation the UI needs lives here


// Functions needed

// section 1 - core calendar grid builders

// 1. getDaysInMonths(year, month) -> returns an integer that represents how many cells to fill

export function getDaysInMonths(year, month){
    return new Date(year, month+1, 0).getDate();
}

// 2. getFirstDayOfMonth(year, month) -> returns first year of the month

export function getFirstDayOfMonth(year, month){
    const jsDays = new Date(year, month, 1).getDay();

    return (jsDays + 6) % 7;
}

// 3. buildCalendarGrid(year, month) -> builds a full 6 x 7 calendar grid as a flat array of day objects
// each entry is one of the types - empty , day,

export function buildCalendarGrid(year, month){
    const grid = [];
    const firstOffset = getFirstDayOfMonth(year, month);
    const daysInCurrent = getDaysInMonths(year, month);
    const today = new Date();

    const prevMonthDays = getDaysInMonths(
        month === 0? year-1 : year,
        month === 0? 11 : month-1
    );

    for (let i = firstOffset-1; i>=0; i--){
        const day = prevMonthDays - i;
        const prevMonth = month === 0? 11 : month - 1;
        const prevYear = month === 0? year - 1: year;

        grid.push({
            type : 'empty',
            date : new Date(prevYear, prevMonth, day),
            day,
            isCurrentMonth : false,
            isToday : false,
        });
    }

    for(let day = 1; day <= daysInCurrent; day++){
        const date = new Date(year, month, day);
        grid.push({
            type : 'day',
            date,
            day,
            isCurrentMonth : true,
            isToday : isSameDay(date, today),
        });
    }


    const remaining = 42 - grid.length;
    const nextMonth = month === 11? 0 : month + 1;
    const nextYear = month === 11? year + 1: year;

    for(let day = 1; day <= remaining; day++){
        grid.push({
            type : 'empty',
            date : new Date(nextYear, nextMonth, day),
            day,
            isCurrentMonth : false,
            isToday : false,
        });
    }

    return grid;

}


// Section 2 : Date comparison helpers 

export function isSameDay(dateA, dateB) {
  if (!dateA || !dateB) return false;
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth()    === dateB.getMonth()    &&
    dateA.getDate()     === dateB.getDate()
  );
}

export function isToday(date){
    return isSameDay(date, new Date());
}

export function isInRange(date, start, end){
    if(!date || !start || !end) return false;

    const d = stripTime(date);
    const s = stripTime(start);
    const e = stripTime(end);

    const rangeStart = s <= e? s : e;
    const rangeEnd = s <= e ? e : s;


    return d >= rangeStart && d <= rangeEnd;
}


export function isRangeStart(date, start){
    return isSameDay(date, start);
}

export function isRangeEnd(date, end){
    return isSameDay(date, end);
}


// Section 3 : Navigation Helpers

export function getPrevMonth(year, month){
    if(month === 0) return {year : year - 1, month: 11};
    return {year, month : month - 1};
}

export function getNextMonth(year, month){
    if(month === 11) return {year : year + 1, month : 0};
    return {year, month : month + 1};
}


// Section 4 : formatting & display

const MONTH_NAMES = [
  'January', 'February', 'March',     'April',
  'May',     'June',     'July',      'August',
  'September','October', 'November',  'December',
];

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec',
];

export function getMonthNames(month){
    return MONTH_NAMES[month];
}

export function getMonthName(month){
    return MONTH_NAMES[month];
}

export function getMonthNameShort(month){
    return MONTH_NAMES_SHORT[month];
}

export function formatDateShort(date){
    if(!date) return '';
    return `${getMonthNameShort(date.getMonth())} ${date.getDate()}`;
}

export function formatRangeLabel(start, end) {
  if (!start) return '';
  if (!end || isSameDay(start, end)) return formatDateShort(start);
  return `${formatDateShort(start)} – ${formatDateShort(end)}`;
}

const MONTH_TO_SEASON = {
  0:  'winter',  // January
  1:  'winter',  // February
  2:  'spring',  // March
  3:  'spring',  // April
  4:  'spring',  // May
  5:  'summer',  // June
  6:  'summer',  // July
  7:  'summer',  // August
  8:  'autumn',  // September
  9:  'autumn',  // October
  10: 'autumn',  // November
  11: 'winter',  // December
};

export function getSeasonFromMonth(month) {
  return MONTH_TO_SEASON[month];
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
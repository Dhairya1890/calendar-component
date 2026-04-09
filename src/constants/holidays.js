/**
 * holidays.js
 *
 * Static list of Japanese public holidays (Shukujitsu).
 * Shown as subtle accent dots on calendar day cells.
 *
 * Format: 'MM-DD' strings keyed in a Set for O(1) lookup.
 * Year-independent — these dates repeat annually.
 *
 * Source: Cabinet Office of Japan official holiday schedule.
 */


// ─────────────────────────────────────────────
// SECTION 1: FIXED-DATE HOLIDAYS
// These fall on the same date every year.
// ─────────────────────────────────────────────

export const FIXED_HOLIDAYS = {
  '01-01': "New Year's Day · 元日",
  '02-11': 'National Foundation Day · 建国記念の日',
  '02-23': "Emperor's Birthday · 天皇誕生日",
  '04-29': 'Showa Day · 昭和の日',
  '05-03': 'Constitution Day · 憲法記念日',
  '05-04': 'Greenery Day · みどりの日',
  '05-05': "Children's Day · こどもの日",
  '08-11': 'Mountain Day · 山の日',
  '11-03': 'Culture Day · 文化の日',
  '11-23': 'Labour Thanksgiving Day · 勤労感謝の日',
};


// ─────────────────────────────────────────────
// SECTION 2: CULTURAL DATES
// Not official holidays but visually marked.
// ─────────────────────────────────────────────

export const CULTURAL_DATES = {
  '01-07': 'Jinjitsu · 人日の節句',
  '03-03': "Hinamatsuri · 雛祭り (Doll's Festival)",
  '07-07': 'Tanabata · 七夕',
  '07-15': 'Obon · お盆',
  '09-09': 'Choyo · 重陽の節句',
  '12-31': "Omisoka · 大晦日 (New Year's Eve)",
};


// ─────────────────────────────────────────────
// SECTION 3: LOOKUP HELPERS
// ─────────────────────────────────────────────

/**
 * Returns the holiday name if the date is a public holiday,
 * or null if it is not.
 *
 * @param {Date} date
 * @returns {string | null}
 *
 * @example
 * getHolidayName(new Date(2026, 0, 1)) // → "New Year's Day · 元日"
 * getHolidayName(new Date(2026, 0, 2)) // → null
 */
export function getHolidayName(date) {
  if (!date) return null;
  const key = formatKey(date);
  return FIXED_HOLIDAYS[key] ?? null;
}


/**
 * Returns the cultural date name if the date is a cultural marker,
 * or null if it is not.
 *
 * @param {Date} date
 * @returns {string | null}
 */
export function getCulturalName(date) {
  if (!date) return null;
  const key = formatKey(date);
  return CULTURAL_DATES[key] ?? null;
}


/**
 * Returns true if the date is a public holiday.
 *
 * @param {Date} date
 * @returns {boolean}
 */
export function isHoliday(date) {
  return getHolidayName(date) !== null;
}


/**
 * Returns true if the date is a cultural marker.
 *
 * @param {Date} date
 * @returns {boolean}
 */
export function isCulturalDate(date) {
  return getCulturalName(date) !== null;
}


/**
 * Returns a combined label for tooltip display.
 * Holiday takes priority over cultural date if both somehow match.
 *
 * @param {Date} date
 * @returns {string | null}
 */
export function getDayLabel(date) {
  return getHolidayName(date) ?? getCulturalName(date) ?? null;
}


// ─────────────────────────────────────────────
// SECTION 4: INTERNAL HELPERS
// ─────────────────────────────────────────────

/**
 * Formats a Date into 'MM-DD' lookup key.
 * Month is padded to 2 digits, day is padded to 2 digits.
 *
 * @param {Date} date
 * @returns {string} e.g. '01-01', '11-23'
 */
function formatKey(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}
/**
 * calendar.js
 *
 * Static display constants for the calendar UI.
 * All labels, names, and configuration values live here
 * so components never hardcode strings inline.
 */


// ─────────────────────────────────────────────
// SECTION 1: LABELS
// ─────────────────────────────────────────────

/**
 * Weekday column headers.
 * Monday-first order to match getFirstDayOfMonth() in dateUtils.
 * Kept to 3 chars for compact display, 1 char available for mobile.
 */
export const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const WEEKDAYS_LETTER = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * Full month names — used in the large calendar header display.
 */
export const MONTH_NAMES = [
  'January', 'February', 'March',     'April',
  'May',     'June',     'July',      'August',
  'September','October', 'November',  'December',
];

/**
 * Short month names — used in notes labels and compact views.
 */
export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec',
];


// ─────────────────────────────────────────────
// SECTION 2: GRID CONFIGURATION
// ─────────────────────────────────────────────

/** Total cells in the calendar grid — always 6 rows × 7 columns */
export const GRID_TOTAL_CELLS = 42;

/** Number of columns (days in a week) */
export const GRID_COLUMNS = 7;

/** Number of rows (weeks visible) */
export const GRID_ROWS = 6;

/** Index of Saturday in the Monday-first weekday array (0-indexed) */
export const SATURDAY_INDEX = 5;

/** Index of Sunday in the Monday-first weekday array (0-indexed) */
export const SUNDAY_INDEX = 6;


// ─────────────────────────────────────────────
// SECTION 3: SELECTION PHASES
// ─────────────────────────────────────────────

/**
 * All valid phases for the useDateRange state machine.
 * Import these instead of using raw strings to avoid typos.
 */
export const SELECTION_PHASE = {
  IDLE:           'idle',
  START_SELECTED: 'start-selected',
  COMPLETE:       'complete',
  DISABLED:       'disabled',
};


// ─────────────────────────────────────────────
// SECTION 4: ANIMATION PHASE
// ─────────────────────────────────────────────

/**
 * Page curl animation states.
 * Used to coordinate between useCalendar navigation
 * and the PageCurl animation component.
 */
export const PAGE_ANIM = {
  IDLE:     'idle',
  CURLING:  'curling',
  SETTLING: 'settling',
};
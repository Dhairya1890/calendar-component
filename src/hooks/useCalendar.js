// derives seasons from months, applies it to the DOM.

import { useState, useMemo } from 'react';
import {
  buildCalendarGrid,
  getMonthName,
  getPrevMonth,
  getNextMonth,
} from '../utils/dateUtils';

/**
 * useCalendar
 *
 * Owns all month/year navigation state and exposes the computed
 * calendar grid plus display-ready strings to the components.
 *
 * This hook never touches the DOM — it's pure state + derived data.
 * The component layer reads everything it needs directly from the
 * values this hook returns.
 *
 * @returns {{
 *   year:         number,       - Current full year e.g. 2026
 *   month:        number,       - Current 0-indexed month e.g. 3 (April)
 *   monthName:    string,       - Display name e.g. "April"
 *   grid:         Array,        - 42 day objects from buildCalendarGrid
 *   goToPrev:     () => void,   - Navigate to previous month
 *   goToNext:     () => void,   - Navigate to next month
 *   goToToday:    () => void,   - Jump back to current real-world month
 *   isCurrentMonth: boolean,    - True if viewing the real current month
 * }}
 */
export function useCalendar() {
  const today = new Date();

  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // ── Navigation ──────────────────────────────────────────────────

  function goToPrev() {
    const prev = getPrevMonth(year, month);
    setYear(prev.year);
    setMonth(prev.month);
  }

  function goToNext() {
    const next = getNextMonth(year, month);
    setYear(next.year);
    setMonth(next.month);
  }

  function goToToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  // ── Derived values ───────────────────────────────────────────────

  // useMemo so the grid array reference is stable between renders
  // unless year or month actually changes. Prevents unnecessary
  // re-renders in DayGrid which maps over all 42 cells.
  const grid = useMemo(
    () => buildCalendarGrid(year, month),
    [year, month]
  );

  const monthName = getMonthName(month);

  // True when the user is viewing the real current month/year.
  // Used to disable the "today" button and style the header.
  const isCurrentMonth =
    year  === today.getFullYear() &&
    month === today.getMonth();

  return {
    year,
    month,
    monthName,
    grid,
    goToPrev,
    goToNext,
    goToToday,
    isCurrentMonth,
  };
}
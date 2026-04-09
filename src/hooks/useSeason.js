// Owns month/year navigator state, builds the grid, exposes display values


import { useEffect } from 'react';
import { getSeasonFromMonth } from '../utils/dateUtils';

/**
 * useSeason
 *
 * Derives the current season from the visible month and applies it
 * to the DOM by setting `data-season` on the root element.
 *
 * That single attribute switches the entire CSS token set defined
 * in globals.css — colors, wood tones, paper warmth, accent colors.
 *
 * @param {number} month - 0-indexed current month from useCalendar
 * @returns {{ season: string }} - 'spring' | 'summer' | 'autumn' | 'winter'
 *
 * @example
 * const { season } = useSeason(currentMonth)
 * // season === 'spring'
 * // document.documentElement has data-season="spring"
 */
export function useSeason(month) {
  const season = getSeasonFromMonth(month);

  useEffect(() => {
    // This is the single line that triggers the entire visual theme switch.
    // CSS in globals.css reads :root[data-season="spring"] { ... } etc.
    document.documentElement.setAttribute('data-season', season);

    // Cleanup: remove the attribute if the component fully unmounts.
    // In practice the calendar is always mounted, but good hygiene.
    return () => {
      document.documentElement.removeAttribute('data-season');
    };
  }, [season]);

  return { season };
}
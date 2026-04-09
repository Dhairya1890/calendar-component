// Owns the selection state machine.

import { useState, useCallback } from 'react';
import {
  isSameDay,
  isInRange,
  isRangeStart,
  isRangeEnd,
  formatRangeLabel,
} from '../utils/dateUtils';

/**
 * useDateRange
 *
 * Owns the date range selection state machine.
 *
 * The machine has four phases:
 *
 *   'idle'
 *     Nothing selected. Calendar is in its resting state.
 *     Any click transitions to 'start-selected'.
 *
 *   'start-selected'
 *     User has clicked one date. We're waiting for the end date.
 *     Hovering over dates previews what the range would look like.
 *     Clicking the same date again stays in this phase (single day).
 *     Clicking any other date transitions to 'complete'.
 *
 *   'complete'
 *     Both start and end are set. Range is fully highlighted.
 *     Clicking any date resets and starts a new selection from that date,
 *     transitioning back to 'start-selected'.
 *
 *   'disabled'
 *     Selection is locked (e.g., during page-curl animation).
 *     All click handlers are no-ops while in this phase.
 *
 * @returns {{
 *   phase:          string,       - Current machine phase
 *   start:          Date|null,    - Selection start date
 *   end:            Date|null,    - Selection end date
 *   hoverDate:      Date|null,    - Date currently being hovered
 *   rangeLabel:     string,       - Formatted label e.g. "Apr 7 – Apr 12"
 *   handleDayClick: (date) => void,
 *   handleDayHover: (date) => void,
 *   handleDayLeave: () => void,
 *   clearSelection: () => void,
 *   disableSelection: () => void,  - Call before page-curl animation
 *   enableSelection:  () => void,  - Call after page-curl animation
 *   getDayState:    (date) => DayState, - Convenience function for rendering
 * }}
 */
export function useDateRange() {
  const [phase,     setPhase]     = useState('idle');
  const [start,     setStart]     = useState(null);
  const [end,       setEnd]       = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  // ── State machine transitions ────────────────────────────────────

  const handleDayClick = useCallback((date) => {
    if (phase === 'disabled') return;

    if (phase === 'idle' || phase === 'complete') {
      // Fresh selection — this date becomes the new start.
      setStart(date);
      setEnd(null);
      setPhase('start-selected');
      return;
    }

    if (phase === 'start-selected') {
      if (isSameDay(date, start)) {
        // Clicked the same date — treat as a single-day selection.
        // Transition to complete with start === end.
        setEnd(date);
        setPhase('complete');
        return;
      }

      // Different date clicked — determine which is earlier so we
      // always store start < end regardless of click order.
      if (date < start) {
        // User clicked earlier than start — swap them.
        setEnd(start);
        setStart(date);
      } else {
        setEnd(date);
      }
      setPhase('complete');
    }
  }, [phase, start]);


  // ── Hover handling (preview during start-selected phase) ─────────

  const handleDayHover = useCallback((date) => {
    if (phase === 'start-selected') {
      setHoverDate(date);
    }
  }, [phase]);

  const handleDayLeave = useCallback(() => {
    setHoverDate(null);
  }, []);


  // ── Manual controls ──────────────────────────────────────────────

  function clearSelection() {
    setStart(null);
    setEnd(null);
    setHoverDate(null);
    setPhase('idle');
  }

  // Lock selection during page-curl animation so rapid clicks
  // don't corrupt state while the transition is in flight.
  function disableSelection() {
    setPhase('disabled');
  }

  function enableSelection() {
    // Restore to whichever logical phase we were in before disabling.
    if (start && end)  { setPhase('complete');       return; }
    if (start && !end) { setPhase('start-selected'); return; }
    setPhase('idle');
  }


  // ── Convenience: getDayState ─────────────────────────────────────
  /**
   * Returns a plain object describing all the visual states a day cell
   * needs to know about. Components destructure this directly.
   *
   * This keeps the visual logic here (in the hook) rather than scattered
   * across DayCell components with inline conditionals.
   *
   * @param {Date} date
   * @returns {{
   *   isStart:          boolean,
   *   isEnd:            boolean,
   *   isInRange:        boolean,
   *   isPreview:        boolean, - in the hover-preview range
   *   isPreviewStart:   boolean,
   *   isPreviewEnd:     boolean,
   *   isSingleDay:      boolean, - start === end
   * }}
   */
  const getDayState = useCallback((date) => {
    // Confirmed selection states
    const confirmedStart = isRangeStart(date, start);
    const confirmedEnd   = isRangeEnd(date, end);
    const inConfirmed    = isInRange(date, start, end);
    const isSingle       = start && end && isSameDay(start, end);

    // Preview states (only active during start-selected + hovering)
    let isPreview      = false;
    let isPreviewStart = false;
    let isPreviewEnd   = false;

    if (phase === 'start-selected' && start && hoverDate) {
      // Determine preview range direction
      const previewStart = hoverDate < start ? hoverDate : start;
      const previewEnd   = hoverDate < start ? start     : hoverDate;

      isPreview      = isInRange(date, previewStart, previewEnd);
      isPreviewStart = isSameDay(date, previewStart);
      isPreviewEnd   = isSameDay(date, previewEnd);
    }

    return {
      isStart:        confirmedStart,
      isEnd:          confirmedEnd,
      isInRange:      inConfirmed,
      isPreview,
      isPreviewStart,
      isPreviewEnd,
      isSingleDay:    !!isSingle,
    };
  }, [phase, start, end, hoverDate]);


  // ── Derived display values ───────────────────────────────────────

  // The label shown above the notes textarea.
  // Updates in real time as the user hovers during start-selected.
  const rangeLabel = (() => {
    if (phase === 'start-selected' && start && hoverDate) {
      const previewStart = hoverDate < start ? hoverDate : start;
      const previewEnd   = hoverDate < start ? start     : hoverDate;
      return formatRangeLabel(previewStart, previewEnd);
    }
    return formatRangeLabel(start, end);
  })();

  return {
    phase,
    start,
    end,
    hoverDate,
    rangeLabel,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    clearSelection,
    disableSelection,
    enableSelection,
    getDayState,
  };
}
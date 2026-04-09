import { useState, useEffect, useCallback } from 'react';
import { useDateRange } from '../../hooks/useDateRange';
import { isHoliday, getDayLabel } from '../../constants/holidays';
import { HeaderImage } from './HeaderImage';
import styles from './Calendar.module.css';

/* ── Japanese display constants ── */
const MONTH_KANJI = [
  '一', '二', '三', '四', '五', '六',
  '七', '八', '九', '十', '十一', '十二',
];
const MONTH_JP = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];
const WEEKDAYS_JP = ['月', '火', '水', '木', '金', '土', '日'];

/* ── localStorage helpers ── */
const STORAGE_KEY = 'calendar-notes';

function loadAllNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function saveAllNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function makeNoteKey(year, month) {
  return `${year}-${month}`;
}

/**
 * Calendar
 *
 * Hanging scroll-style calendar with:
 *   - Large kanji header, JP weekday labels
 *   - Day range selector with visual states
 *   - Integrated notes section (persisted via localStorage)
 *   - Holiday markers
 */
export function Calendar({
  year, month, monthName, grid,
  goToPrev, goToNext, isCurrentMonth,
}) {
  const {
    phase,
    rangeLabel,
    handleDayClick,
    handleDayHover,
    handleDayLeave,
    clearSelection,
    getDayState,
  } = useDateRange();

  /* ── Notes state with localStorage persistence ── */
  const noteKey = makeNoteKey(year, month);
  const [notes, setNotes] = useState('');

  // Load notes when month/year changes
  useEffect(() => {
    const all = loadAllNotes();
    setNotes(all[noteKey] || '');
  }, [noteKey]);

  // Persist notes on change
  const handleNotesChange = useCallback((e) => {
    const val = e.target.value;
    setNotes(val);
    const all = loadAllNotes();
    if (val.trim()) {
      all[noteKey] = val;
    } else {
      delete all[noteKey];
    }
    saveAllNotes(all);
  }, [noteKey]);

  return (
    <div className={styles.paper}>

      {/* ── Top wooden dowel ── */}
      <div className={styles.dowel} aria-hidden="true" />

      {/* ── Header image: monthly illustration ── */}
      <HeaderImage month={month} />

      {/* ── Header: large kanji month ── */}
      <header className={styles.header}>
        <span className={styles.kanji}>{MONTH_KANJI[month]}</span>
        <div className={styles.meta}>
          <span className={styles.monthJp}>{MONTH_JP[month]}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.yearLabel}>{year}</span>
        </div>
      </header>

      {/* ── Navigation ── */}
      <nav className={styles.nav}>
        <button className={styles.navBtn} onClick={goToPrev} aria-label="Previous month">◀</button>
        <span className={styles.navLabel}>{monthName} {year}</span>
        <button className={styles.navBtn} onClick={goToNext} aria-label="Next month">▶</button>
      </nav>

      {/* ── Weekday headers ── */}
      <div className={styles.weekRow}>
        {WEEKDAYS_JP.map((label, i) => (
          <span
            key={i}
            className={`${styles.weekLabel} ${i === 6 ? styles.isSunday : ''} ${i === 5 ? styles.isSaturday : ''}`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* ── Day grid ── */}
      <div className={styles.grid}>
        {grid.map((cell, i) => {
          const dayState = getDayState(cell.date);
          const holiday = isHoliday(cell.date);
          const isSun = cell.date.getDay() === 0;
          const isSat = cell.date.getDay() === 6;

          const cls = [
            styles.day,
            !cell.isCurrentMonth && styles.muted,
            cell.isToday && styles.today,
            (isSun || holiday) && styles.red,
            isSat && styles.blue,
            (dayState.isStart || dayState.isEnd || dayState.isSingleDay) && styles.selected,
            dayState.isInRange && styles.inRange,
            dayState.isPreview && styles.preview,
          ].filter(Boolean).join(' ');

          return (
            <button
              key={i}
              className={cls}
              onClick={() => cell.isCurrentMonth && handleDayClick(cell.date)}
              onMouseEnter={() => handleDayHover(cell.date)}
              onMouseLeave={handleDayLeave}
              title={getDayLabel(cell.date) || undefined}
              tabIndex={cell.isCurrentMonth ? 0 : -1}
            >
              <span className={styles.dayNum}>{cell.day}</span>
              {holiday && cell.isCurrentMonth && (
                <span className={styles.holidayDot} aria-label="Holiday" />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Notes section ── */}
      <div className={styles.notesSection}>
        <div className={styles.notesHeader}>
          <span className={styles.notesTitle}>
            {phase === 'complete' || phase === 'start-selected'
              ? 'Notes'
              : 'Monthly Notes'
            }
          </span>
          {phase !== 'idle' && (
            <button
              className={styles.clearBtn}
              onClick={clearSelection}
              aria-label="Clear selection"
            >
              Clear
            </button>
          )}
        </div>

        {/* Range label — shows selected dates */}
        {rangeLabel && (
          <span className={styles.rangeLabel}>{rangeLabel}</span>
        )}

        {/* Phase hint */}
        {phase === 'idle' && (
          <span className={styles.phaseHint}>Click a date to start selecting</span>
        )}
        {phase === 'start-selected' && (
          <span className={styles.phaseHint}>Click another date to complete range</span>
        )}

        {/* Notes textarea */}
        <textarea
          className={styles.notesInput}
          value={notes}
          onChange={handleNotesChange}
          placeholder={
            phase === 'complete'
              ? `Notes for ${rangeLabel}...`
              : `Notes for ${monthName} ${year}...`
          }
          rows={3}
        />
      </div>

    </div>
  );
}

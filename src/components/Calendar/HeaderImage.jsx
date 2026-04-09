import styles from './Calendar.module.css';

/* ── Static imports for each month's header image ── */
import img01 from '../../assets/calendar-headers/01.jpeg';
import img02 from '../../assets/calendar-headers/02.jpeg';
import img03 from '../../assets/calendar-headers/03.jpeg';
import img04 from '../../assets/calendar-headers/04.jpeg';
import img05 from '../../assets/calendar-headers/05.jpg';
import img06 from '../../assets/calendar-headers/06.jpeg';
import img07 from '../../assets/calendar-headers/07.webp';
import img08 from '../../assets/calendar-headers/08.jpeg';
import img09 from '../../assets/calendar-headers/09.jpeg';
import img10 from '../../assets/calendar-headers/10.jpeg';
import img11 from '../../assets/calendar-headers/11.jpeg';
import img12 from '../../assets/calendar-headers/12.jpeg';

/**
 * Month-indexed image map (0-indexed: 0 = January … 11 = December)
 */
const MONTH_IMAGES = [
  img01, img02, img03, img04, img05, img06,
  img07, img08, img09, img10, img11, img12,
];

/**
 * Japanese month names for alt text
 */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * HeaderImage
 *
 * Renders the monthly header illustration above the calendar grid.
 * Each month maps to a unique image stored in assets/calendar-headers/.
 *
 * @param {{ month: number }} props — 0-indexed month
 */
export function HeaderImage({ month }) {
  const src = MONTH_IMAGES[month] || MONTH_IMAGES[0];
  const alt = `${MONTH_NAMES[month] || 'Calendar'} scene`;

  return (
    <div className={styles.headerImage}>
      <img
        className={styles.headerImg}
        src={src}
        alt={alt}
        loading="eager"
        draggable={false}
      />
    </div>
  );
}

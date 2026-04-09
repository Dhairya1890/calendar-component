import styles from './Scene.module.css';
import { Garden } from '../Garden/Garden';

/**
 * Scene
 *
 * Full-viewport Japanese room interior:
 *   - Garden window (left) with wooden frame + seasonal SVG garden
 *   - Shoji wall (center-right) where the calendar hangs
 *   - Shoji sliding doors (far right) with kumiko grid
 *   - Tatami floor strip at the bottom
 *
 * Purely presentational — season + children (Calendar) come from parent.
 *
 * @param {{ season: string, children: React.ReactNode }} props
 */
export function Scene({ season, children }) {
  return (
    <div className={styles.scene} data-season={season}>

      {/* ── Main Room ── */}
      <div className={styles.room}>

        {/* ═══ Garden Window (Left ~42%) ═══ */}
        <section className={styles.garden}>
          <div className={styles.lintel} />
          <div className={styles.gardenInner}>
            <div className={styles.pillarLeft} />
            <div className={styles.gardenView}>
              <Garden season={season} />
              <div className={styles.gardenVignette} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ═══ Center Pillar ═══ */}
        <div className={styles.pillarCenter} />

        {/* ═══ Right: Shoji Wall + Doors ═══ */}
        <section className={styles.rightSection}>
          <div className={styles.topRail} />
          <div className={styles.rightBody}>

            {/* Shoji Wall — calendar hangs here */}
            <div className={styles.shojiWall}>
              {/* Light spill from garden */}
              <div className={styles.lightSpill} aria-hidden="true" />

              {/* Hanging system: nail + ropes */}
              <div className={styles.hangerSystem}>
                <div className={styles.nail} />
                <svg
                  className={styles.ropes}
                  viewBox="0 0 100 40"
                  fill="none"
                  aria-hidden="true"
                >
                  <line x1="50" y1="2" x2="10" y2="38" />
                  <line x1="50" y1="2" x2="90" y2="38" />
                </svg>
              </div>

              {/* Calendar mount */}
              <div className={styles.calendarArea}>
                {children}
              </div>
            </div>

            {/* Shoji Sliding Doors */}
            <div className={styles.shojiDoors}>
              <div className={styles.doorPanel} />
              <div className={styles.doorDivider} />
              <div className={styles.doorPanel} />
            </div>

          </div>
        </section>

      </div>

      {/* ── Tatami Floor ── */}
      <div className={styles.tatami}>
        <div className={styles.tatamiMat} />
        <div className={styles.tatamiGap} />
        <div className={styles.tatamiMat} />
        <div className={styles.tatamiGap} />
        <div className={styles.tatamiMat} />
      </div>

    </div>
  );
}
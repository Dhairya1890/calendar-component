/**
 * seasons.js
 *
 * Season configuration — maps months to seasons and defines
 * per-season garden scene properties used by the Garden component.
 *
 * The CSS token switching is handled by useSeason setting
 * data-season on :root. This file drives the *visual scene*
 * logic — what the garden looks like, what particles fall, etc.
 */


// ─────────────────────────────────────────────
// SECTION 1: MONTH → SEASON MAP
// ─────────────────────────────────────────────

/**
 * Maps 0-indexed JS month numbers to season strings.
 * Follows Japanese seasonal calendar (Nijushi-sekki inspired):
 *   Spring : March – May
 *   Summer : June – August
 *   Autumn : September – November
 *   Winter : December – February
 */
export const MONTH_TO_SEASON = {
  0:  'winter',
  1:  'winter',
  2:  'spring',
  3:  'spring',
  4:  'spring',
  5:  'summer',
  6:  'summer',
  7:  'summer',
  8:  'autumn',
  9:  'autumn',
  10: 'autumn',
  11: 'winter',
};


// ─────────────────────────────────────────────
// SECTION 2: SEASON → GARDEN SCENE CONFIG
// ─────────────────────────────────────────────

/**
 * Per-season configuration for the garden window scene.
 *
 * sky           : CSS gradient string for the sky behind the garden
 * groundColor   : Base color of the garden ground / moss
 * treeType      : Which SVG tree silhouette to render ('cherry'|'maple'|'pine'|'bare')
 * particle      : What drifts through the air (null = nothing)
 * particleColor : Color of the drifting particle
 * particleCount : How many particles animate simultaneously
 * lightColor    : Color tint of the ambient light wash on the shoji wall
 * lightIntensity: Opacity of the light wash (0–1)
 * mistOpacity   : Ground mist layer opacity (0–1)
 */
export const SEASON_CONFIG = {

  spring: {
    sky: 'linear-gradient(180deg, #C9E8F5 0%, #EDD9E8 60%, #F5EAF0 100%)',
    groundColor: '#A8C97E',
    treeType: 'cherry',
    particle: 'petal',
    particleColor: '#F2C9D8',
    particleCount: 12,
    lightColor: 'rgba(255, 220, 230, 0.18)',
    lightIntensity: 0.18,
    mistOpacity: 0.1,
  },

  summer: {
    sky: 'linear-gradient(180deg, #5B9BD5 0%, #87CEEB 50%, #C8E6F5 100%)',
    groundColor: '#4A7C59',
    treeType: 'pine',
    particle: null,
    particleColor: null,
    particleCount: 0,
    lightColor: 'rgba(255, 245, 200, 0.22)',
    lightIntensity: 0.22,
    mistOpacity: 0.0,
  },

  autumn: {
    sky: 'linear-gradient(180deg, #C4956A 0%, #D4A574 40%, #E8C99A 100%)',
    groundColor: '#8B6914',
    treeType: 'maple',
    particle: 'leaf',
    particleColor: '#D48C45',
    particleCount: 8,
    lightColor: 'rgba(220, 160, 80, 0.2)',
    lightIntensity: 0.2,
    mistOpacity: 0.08,
  },

  winter: {
    sky: 'linear-gradient(180deg, #8BA7C0 0%, #B8CDD9 50%, #D4E4EE 100%)',
    groundColor: '#C8D8E0',
    treeType: 'bare',
    particle: 'snow',
    particleColor: '#FFFFFF',
    particleCount: 20,
    lightColor: 'rgba(200, 220, 240, 0.15)',
    lightIntensity: 0.15,
    mistOpacity: 0.15,
  },

};


// ─────────────────────────────────────────────
// SECTION 3: SEASON TRANSITION CONFIG
// ─────────────────────────────────────────────

/**
 * How long the garden cross-fades when the season changes.
 * Matches --duration-slow in globals.css.
 */
export const SEASON_TRANSITION_MS = 1200;

/**
 * All valid season strings — useful for validation and iteration.
 */
export const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
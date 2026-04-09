import { useMemo } from 'react';
import styles from './Garden.module.css';

/* ── Per-season color palette for the garden SVG ── */
const THEMES = {
  spring: {
    sky:      ['#C9E8F5', '#E8DCE8', '#F0E8EC'],
    canopy:   ['#4A8335', '#3A6B28', '#6A9E48', '#5C8E3A'],
    blossom:  '#F2C9D8',
    trunk:    ['#5A4A35', '#4A3A25'],
    ground:   ['#7AAD52', '#5C8E38', '#8FC06A'],
    pond:     ['#7AB5A0', '#4A8D78'],
    stone:    '#8A8A7A',
    lantern:  '#9A9A88',
    particle: { type: 'petal', color: '#F2C9D8', count: 12 },
    showBranches: false,
    snowCap: false,
  },
  summer: {
    sky:      ['#5B9BD5', '#82C5E5', '#A8D8EA'],
    canopy:   ['#3A6B3A', '#2A5A28', '#4A8C4A', '#357535'],
    blossom:  null,
    trunk:    ['#4A3A25', '#3A2A18'],
    ground:   ['#4A7C59', '#3A6B48', '#5A8E5A'],
    pond:     ['#5BAAA0', '#3A8878'],
    stone:    '#888878',
    lantern:  '#989888',
    particle: { type: null, color: null, count: 0 },
    showBranches: false,
    snowCap: false,
  },
  autumn: {
    sky:      ['#D4A574', '#DEB888', '#E8CCA0'],
    canopy:   ['#C87533', '#A85A22', '#D4964A', '#B86828'],
    blossom:  null,
    trunk:    ['#5A4A35', '#4A3A25'],
    ground:   ['#B89428', '#987A18', '#C8A438'],
    pond:     ['#8AA07A', '#6A8060'],
    stone:    '#8A8874',
    lantern:  '#9A9884',
    particle: { type: 'leaf', color: '#D48C45', count: 8 },
    showBranches: false,
    snowCap: false,
  },
  winter: {
    sky:      ['#8BA7C0', '#A8BED0', '#C8D8E0'],
    canopy:   ['#6A7A72', '#5A6A62', '#7A8A7A', '#657568'],
    blossom:  null,
    trunk:    ['#5A4A35', '#4A3A25'],
    ground:   ['#D8E0D0', '#C8D0C0', '#E0E8D8'],
    pond:     ['#9AB0C0', '#7A90A0'],
    stone:    '#9A9A8A',
    lantern:  '#A0A094',
    particle: { type: 'snow', color: '#FFF', count: 20 },
    showBranches: true,
    snowCap: true,
  },
};

/**
 * Garden — SVG scene viewed through the window.
 * All colors react to the `season` prop; particles animate via CSS.
 */
export function Garden({ season = 'spring' }) {
  const t = THEMES[season] || THEMES.spring;

  /* Deterministic particle positions (stable across re-renders) */
  const particles = useMemo(() => {
    const arr = [];
    const count = t.particle.count;
    for (let i = 0; i < count; i++) {
      const seed = (i + 1) * 137.508;
      arr.push({
        id: i,
        x: ((seed * 7.3) % 780) + 10,
        size: t.particle.type === 'snow'
          ? 2 + (seed % 3)
          : 4 + (seed % 5),
        delay: ((seed * 1.1) % 6).toFixed(1),
        dur:   (5 + (seed * 0.7) % 5).toFixed(1),
      });
    }
    return arr;
  }, [season]);

  return (
    <div className={styles.garden}>
      <svg
        className={styles.svg}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── Gradient defs ── */}
        <defs>
          <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={t.sky[0]} />
            <stop offset="50%"  stopColor={t.sky[1]} />
            <stop offset="100%" stopColor={t.sky[2]} />
          </linearGradient>
          <linearGradient id="g-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={t.ground[0]} />
            <stop offset="100%" stopColor={t.ground[1]} />
          </linearGradient>
          <linearGradient id="g-pond" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={t.pond[0]} />
            <stop offset="100%" stopColor={t.pond[1]} />
          </linearGradient>
          <radialGradient id="g-mist" cx="50%" cy="80%" r="60%">
            <stop offset="0%"   stopColor="#fff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 1. Sky ── */}
        <rect width="800" height="600" fill="url(#g-sky)" />

        {/* ── 2. Distant hills ── */}
        <ellipse cx="200" cy="265" rx="260" ry="55" fill={t.canopy[2]} opacity=".25" />
        <ellipse cx="620" cy="275" rx="300" ry="48" fill={t.canopy[3]} opacity=".2" />

        {/* ── 3. Tree canopy (back row) ── */}
        <ellipse cx="80"  cy="225" rx="85"  ry="95"  fill={t.canopy[1]} />
        <ellipse cx="230" cy="200" rx="105" ry="110" fill={t.canopy[0]} />
        <ellipse cx="400" cy="215" rx="95"  ry="100" fill={t.canopy[2]} />
        <ellipse cx="560" cy="195" rx="115" ry="110" fill={t.canopy[1]} />
        <ellipse cx="720" cy="220" rx="100" ry="95"  fill={t.canopy[0]} />
        {/* Highlight crowns */}
        <ellipse cx="230" cy="175" rx="65" ry="55" fill={t.canopy[3]} opacity=".45" />
        <ellipse cx="560" cy="170" rx="70" ry="55" fill={t.canopy[3]} opacity=".4" />

        {/* ── 4. Cherry blossoms (spring) ── */}
        {t.blossom && (
          <g opacity=".7">
            <ellipse cx="240" cy="172" rx="74" ry="62" fill={t.blossom} />
            <ellipse cx="310" cy="198" rx="52" ry="46" fill={t.blossom} opacity=".55" />
            <ellipse cx="560" cy="168" rx="64" ry="54" fill={t.blossom} />
            <ellipse cx="160" cy="200" rx="40" ry="38" fill={t.blossom} opacity=".5" />
          </g>
        )}

        {/* ── 5. Tree trunks ── */}
        <rect x="224" y="275" width="12" height="75" rx="3" fill={t.trunk[0]} />
        <rect x="394" y="280" width="10" height="65" rx="3" fill={t.trunk[1]} />
        <rect x="553" y="268" width="14" height="80" rx="3" fill={t.trunk[0]} />
        <rect x="74"  y="278" width="10" height="68" rx="3" fill={t.trunk[1]} />
        <rect x="714" y="282" width="11" height="62" rx="3" fill={t.trunk[0]} />

        {/* ── 6. Bare branches (winter) ── */}
        {t.showBranches && (
          <g stroke={t.trunk[0]} fill="none" strokeLinecap="round">
            <polyline points="236,210 260,170 285,148" strokeWidth="2.5" />
            <line x1="260" y1="170" x2="248" y2="138" strokeWidth="1.5" />
            <line x1="285" y1="148" x2="300" y2="130" strokeWidth="1" />
            <polyline points="400,218 428,182 452,158" strokeWidth="2" />
            <line x1="428" y1="182" x2="418" y2="150" strokeWidth="1.2" />
            <polyline points="560,205 588,168 608,142" strokeWidth="2.5" />
            <line x1="588" y1="168" x2="575" y2="138" strokeWidth="1.2" />
          </g>
        )}

        {/* ── 7. Ground plane ── */}
        <path
          d="M0 345 Q150 315 350 335 Q550 355 800 325 L800 600 L0 600Z"
          fill="url(#g-ground)"
        />
        {/* Moss patches */}
        <ellipse cx="300" cy="400" rx="125" ry="28" fill={t.ground[2]} opacity=".45" />
        <ellipse cx="580" cy="425" rx="100" ry="22" fill={t.ground[1]} opacity=".35" />

        {/* Snow cover (winter) */}
        {t.snowCap && (
          <g>
            <ellipse cx="300" cy="385" rx="150" ry="22" fill="#EEF2F6" opacity=".55" />
            <ellipse cx="620" cy="405" rx="130" ry="18" fill="#E4E8EE" opacity=".45" />
          </g>
        )}

        {/* ── 8. Stone lantern ── */}
        <g transform="translate(360,318)">
          <rect x="-14" y="28"  width="28" height="8" rx="2" fill={t.lantern} />
          <rect x="-5"  y="5"   width="10" height="23" rx="1" fill={t.stone} />
          <polygon points="-20,-8 20,-8 14,5 -14,5" fill={t.lantern} />
          <rect x="-4"  y="-14" width="8"  height="6" rx="2" fill={t.stone} />
          <rect x="-3"  y="12"  width="6"  height="7" rx="1" fill="#EAE2D2" opacity=".8" />
          {t.snowCap && <ellipse cx="0" cy="-12" rx="18" ry="5" fill="#EEF2F6" />}
        </g>

        {/* ── 9. Stepping stones ── */}
        <ellipse cx="430" cy="410" rx="18" ry="9"  fill={t.stone} opacity=".8" />
        <ellipse cx="475" cy="388" rx="16" ry="8"  fill={t.stone} opacity=".75" />
        <ellipse cx="510" cy="368" rx="14" ry="7"  fill={t.stone} opacity=".7" />
        <ellipse cx="545" cy="352" rx="16" ry="8"  fill={t.stone} opacity=".75" />

        {/* ── 10. Pond ── */}
        <ellipse cx="230" cy="490" rx="190" ry="58" fill="url(#g-pond)" opacity=".75" />
        <ellipse cx="210" cy="485" rx="42" ry="9" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth=".6" />
        <ellipse cx="260" cy="498" rx="30" ry="7" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth=".5" />

        {/* ── 11. Front framing foliage ── */}
        <ellipse cx="-30" cy="555" rx="105" ry="85" fill={t.canopy[1]} opacity=".35" />
        <ellipse cx="830" cy="545" rx="115" ry="90" fill={t.canopy[1]} opacity=".3" />

        {/* ── 12. Atmospheric mist ── */}
        <rect width="800" height="600" fill="url(#g-mist)" opacity=".5" />

        {/* ── 13. Particles ── */}
        {particles.map((p) => {
          const type = t.particle.type;
          if (type === 'petal') return (
            <ellipse
              key={p.id}
              cx={p.x} cy={-20}
              rx={p.size} ry={p.size * 0.6}
              fill={t.particle.color} opacity=".8"
              className={styles.petal}
              style={{ animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
            />
          );
          if (type === 'leaf') return (
            <ellipse
              key={p.id}
              cx={p.x} cy={-20}
              rx={p.size * 0.8} ry={p.size * 0.5}
              fill={t.particle.color} opacity=".75"
              className={styles.leaf}
              style={{ animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
            />
          );
          if (type === 'snow') return (
            <circle
              key={p.id}
              cx={p.x} cy={-20}
              r={p.size}
              fill={t.particle.color} opacity=".85"
              className={styles.snow}
              style={{ animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}
            />
          );
          return null;
        })}
      </svg>
    </div>
  );
}

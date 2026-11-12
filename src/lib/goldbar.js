// Jongkong emas 250g realistik (tegak, tuang). Digunakan semula dalam video akan datang.
//
// Guna:
//   1. Letak GOLDBAR_DEFS sekali dalam <svg width="0" height="0" style="position:absolute"><defs>...</defs></svg>
//      (jangan letak dalam elemen display:none, gradient tak akan dirujuk).
//   2. goldBar(cx, cy, tinggi, {rot}) memulangkan <g> SVG yang boleh disisip dalam mana-mana <svg>.
//
// Rujukan: gambar jongkong 250g sebenar (sudut bulat, permukaan tuang matte, tulisan timbul
// "250g / GOLD / 999.9", cop pengesahan dan nombor siri). Tiada logo jenama.

const GOLDBAR_DEFS = `
<linearGradient id="gbBody" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FFE9A0"/><stop offset=".3" stop-color="#F3C24C"/>
  <stop offset=".65" stop-color="#D9A02A"/><stop offset="1" stop-color="#9C6A12"/>
</linearGradient>
<radialGradient id="gbPlate" cx=".38" cy=".3" r=".95">
  <stop offset="0" stop-color="#FFF0B5"/><stop offset=".45" stop-color="#F6CB5A"/>
  <stop offset=".85" stop-color="#DDA42D"/><stop offset="1" stop-color="#C58E1E"/>
</radialGradient>
<linearGradient id="gbRim" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FFF8D8"/><stop offset=".5" stop-color="#E7B53F"/><stop offset="1" stop-color="#8A5C0C"/>
</linearGradient>
<linearGradient id="gbSheen" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
</linearGradient>
<filter id="gbBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="gbGrain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 .35  0 0 0 0 .22  0 0 0 0 .02  0 0 0 .22 0"/>
</filter>
<clipPath id="gbClip"><rect x="-150" y="-300" width="300" height="600" rx="66"/></clipPath>`;

// Tulisan timbul: cahaya di atas-kiri, bayang di bawah-kanan.
function gbEmboss(x, y, size, txt, rot = 0) {
  const t = (dx, dy, fill, op) =>
    `<text x="${x + dx}" y="${y + dy}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="${size}" ` +
    `fill="${fill}" opacity="${op}" transform="rotate(${rot} ${x} ${y})">${txt}</text>`;
  return t(-2.5, -2.5, '#FFF6D0', 0.9) + t(2.5, 3, '#6E4608', 0.55) + t(0, 0, '#E3AB35', 1);
}

// Cop pengesahan generik (rumah kecil + dua baris), bukan cop jenama tertentu.
function gbHallmark(y) {
  return `<g transform="translate(0,${y})">
    <rect x="-86" y="-30" width="172" height="60" rx="8" fill="none" stroke="#B98417" stroke-width="4" opacity=".9"/>
    <rect x="-84" y="-32" width="172" height="60" rx="8" fill="none" stroke="#FFF3C4" stroke-width="2" opacity=".8"/>
    <polygon points="-62,-4 -46,-20 -30,-4" fill="#B98417" opacity=".9"/>
    <rect x="-58" y="-4" width="24" height="16" fill="#B98417" opacity=".9"/>
    <rect x="-14" y="-14" width="70" height="7" rx="3" fill="#B98417" opacity=".85"/>
    <rect x="-14" y="2" width="52" height="7" rx="3" fill="#B98417" opacity=".7"/>
  </g>`;
}

// Cop bulat hiasan di atas (bintang 8 penjuru), bukan logo jenama.
function gbSeal(y) {
  let star = '';
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8, r = i % 2 ? 14 : 30;
    star += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(1) + ' ' + (r * Math.sin(a)).toFixed(1);
  }
  return `<g transform="translate(0,${y})">
    <circle r="46" fill="none" stroke="#B98417" stroke-width="5" opacity=".85"/>
    <circle r="40" fill="none" stroke="#FFF3C4" stroke-width="2.5" opacity=".9"/>
    <path d="${star}Z" fill="#E3AB35" stroke="#B98417" stroke-width="3"/>
  </g>`;
}

function goldBar(cx, cy, h, opts = {}) {
  const { rot = 0, serial = 'G001250' } = opts;
  const s = h / 600;
  return `<g transform="translate(${cx},${cy}) rotate(${rot}) scale(${s})">
    <rect x="-150" y="-286" width="300" height="600" rx="66" fill="#000" opacity=".3" filter="url(#gbBlur)"/>
    <rect x="-150" y="-300" width="300" height="600" rx="66" fill="url(#gbBody)" stroke="#A8730F" stroke-width="5"/>
    <rect x="-140" y="-290" width="280" height="580" rx="58" fill="none" stroke="url(#gbRim)" stroke-width="10"/>
    <rect x="-122" y="-272" width="244" height="544" rx="46" fill="url(#gbPlate)"/>
    <g clip-path="url(#gbClip)">
      <rect x="-150" y="-300" width="300" height="600" filter="url(#gbGrain)"/>
      <polygon points="-110,-300 -40,-300 -90,300 -160,300" fill="url(#gbSheen)" opacity=".75"/>
      <rect x="-120" y="-270" width="240" height="14" rx="7" fill="#fff" opacity=".35"/>
    </g>
    ${gbSeal(-170)}
    ${gbEmboss(0, -50, 70, '250g')}
    ${gbEmboss(0, 34, 70, 'GOLD')}
    ${gbEmboss(0, 118, 70, '999.9')}
    ${gbHallmark(195)}
    ${gbEmboss(0, 262, 30, serial, -3)}
  </g>`;
}

if (typeof module !== 'undefined') module.exports = { GOLDBAR_DEFS, goldBar };

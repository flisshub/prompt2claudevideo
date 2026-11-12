// Dinar emas 10 realistik. Digunakan semula dalam video akan datang.
//
// Rujukan: gambar 10 Dinar 42.5g Au999.9 (tepi berfacet 12 sisi, cincin titik-titik,
// bunga teratai 8 kelopak timbul, "10 Dinar" di tengah, teks melengkung di tepi,
// medan licin lebih gelap dan unsur timbul lebih cerah). Tiada logo atau nama jenama.
//
// Guna:
//   1. Letak GOLDDINAR_DEFS sekali dalam <svg width="0" height="0" style="position:absolute"><defs>...</defs></svg>
//   2. goldDinar(cx, cy, jejari, {denom:'10', weight:'42.5g', purity:'999.9', top:'DINAR EMAS'})

const GOLDDINAR_DEFS = `
<radialGradient id="gdRim" cx=".35" cy=".3" r="1">
  <stop offset="0" stop-color="#FFF1B0"/><stop offset=".5" stop-color="#E8B83F"/><stop offset="1" stop-color="#93640F"/>
</radialGradient>
<radialGradient id="gdField" cx=".4" cy=".32" r=".95">
  <stop offset="0" stop-color="#E6B33C"/><stop offset=".55" stop-color="#C99428"/><stop offset="1" stop-color="#8A5C0C"/>
</radialGradient>
<radialGradient id="gdRelief" cx=".35" cy=".3" r=".95">
  <stop offset="0" stop-color="#FFF4C0"/><stop offset=".55" stop-color="#F3C95A"/><stop offset="1" stop-color="#D9A02A"/>
</radialGradient>
<linearGradient id="gdSheen" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".45" stop-color="#fff" stop-opacity=".45"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/>
</linearGradient>
<filter id="gdBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>`;

let _gdN = 0;

function gdFacet(r, sides, round) {
  const sec = (Math.PI * 2) / sides;
  let d = '';
  for (let i = 0; i <= 360; i++) {
    const a = (i / 360) * Math.PI * 2 - Math.PI / 2;
    const m = ((a % sec) + sec) % sec;
    const poly = Math.cos(Math.PI / sides) / Math.cos(m - sec / 2);
    const rr = r * (1 - round + round * poly);
    d += (i ? 'L' : 'M') + (rr * Math.cos(a)).toFixed(1) + ' ' + (rr * Math.sin(a)).toFixed(1);
  }
  return d + 'Z';
}

// Bunga teratai 8 kelopak bulat, bertakuk di antara kelopak.
function gdLotus(R) {
  let d = '';
  for (let i = 0; i <= 360; i++) {
    const a = (i / 360) * Math.PI * 2 - Math.PI / 2;
    const rr = R * (0.72 + 0.28 * Math.pow(Math.abs(Math.cos(4 * a)), 0.7));
    d += (i ? 'L' : 'M') + (rr * Math.cos(a)).toFixed(1) + ' ' + (rr * Math.sin(a)).toFixed(1);
  }
  return d + 'Z';
}

function goldDinar(cx, cy, r, opts = {}) {
  const { denom = '10', weight = '42.5g', purity = '999.9', top = 'DINAR EMAS' } = opts;
  const id = 'gdp' + _gdN++;
  const lotus = gdLotus(r * 0.52);
  const ring = r * 0.8, topR = r * 0.7, botR = r * 0.74;
  const emb = (x, y, size, txt, style) => {
    const f = `font-family="DejaVu Serif, Georgia, serif" font-weight="700" font-size="${size}" text-anchor="middle" ${style || ''}`;
    return `<text x="${x - r * 0.012}" y="${y - r * 0.012}" ${f} fill="#FFF6D0" opacity=".9">${txt}</text>` +
           `<text x="${x + r * 0.014}" y="${y + r * 0.016}" ${f} fill="#5E3C05" opacity=".6">${txt}</text>` +
           `<text x="${x}" y="${y}" ${f} fill="#F7D26A">${txt}</text>`;
  };
  return `<g transform="translate(${cx},${cy})">
    <ellipse cx="0" cy="${r * 0.12}" rx="${r}" ry="${r * 0.94}" fill="#000" opacity=".3" filter="url(#gdBlur)"/>
    <path d="${gdFacet(r, 12, 0.55)}" fill="url(#gdRim)" stroke="#8A5C0C" stroke-width="${r * 0.025}"/>
    <path d="${gdFacet(r * 0.93, 12, 0.55)}" fill="url(#gdField)" stroke="#F3D27A" stroke-width="${r * 0.02}" opacity=".98"/>
    <path d="${gdFacet(r * 0.93, 12, 0.55)}" fill="url(#gdSheen)" opacity=".7"/>
    <circle r="${ring}" fill="none" stroke="#FFE9A0" stroke-width="${r * 0.03}" stroke-dasharray="${r * 0.004} ${r * 0.058}" stroke-linecap="round" opacity=".9"/>
    <path id="${id}t" d="M ${-topR} 0 A ${topR} ${topR} 0 0 1 ${topR} 0" fill="none"/>
    <path id="${id}b" d="M ${-botR} 0 A ${botR} ${botR} 0 0 0 ${botR} 0" fill="none"/>
    <text font-family="DejaVu Serif, Georgia, serif" font-weight="700" font-size="${r * 0.12}" letter-spacing="${r * 0.02}" fill="#FFF0B0" opacity=".95">
      <textPath href="#${id}t" startOffset="50%" text-anchor="middle">${top}</textPath></text>
    <text font-family="DejaVu Serif, Georgia, serif" font-weight="700" font-size="${r * 0.1}" letter-spacing="${r * 0.012}" fill="#FFF0B0" opacity=".95" dy="${r * 0.08}">
      <textPath href="#${id}b" startOffset="50%" text-anchor="middle">${weight}  Au ${purity}</textPath></text>
    <path d="${lotus}" fill="url(#gdRelief)" stroke="#7A4F08" stroke-width="${r * 0.025}" transform="translate(${r * 0.012},${r * 0.016})" opacity=".5"/>
    <path d="${lotus}" fill="url(#gdRelief)" stroke="#8A5C0C" stroke-width="${r * 0.02}"/>
    <path d="${lotus}" fill="none" stroke="#FFF6D0" stroke-width="${r * 0.012}" transform="scale(.9)" opacity=".75"/>
    ${emb(0, -r * 0.02, r * 0.3, denom)}
    ${emb(0, r * 0.2, r * 0.17, 'Dinar', 'font-style="italic"')}
  </g>`;
}

if (typeof module !== 'undefined') module.exports = { GOLDDINAR_DEFS, goldDinar };

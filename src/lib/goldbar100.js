// Jongkong emas 100g, bentuk dan reka bentuk sebenar (rujukan gambar yang diberi pengguna).
//
// INGAT: jongkong 100g = papak TEGAK yang nipis (nisbah lebar:tinggi kira-kira 0.62),
// sudut bulat, bingkai timbul di tepi, permukaan cermin berkilat. Susunan tulisan dari atas:
//   1. tulisan "Public Gold" (tulisan sahaja, tanpa logo)
//   2. 100g
//   3. 999.9
//   4. FINE GOLD
//   5. kotak cop pengesahan (lambang bunga raya + "PENANG ASSAYER")
//   6. kotak nombor siri di bawah
// Jangan guna ketulan tebal mendatar untuk 100g. (goldbar.js ialah jongkong 250g tuang.)
//
// Guna:
//   1. Letak GOLDBAR100_DEFS sekali dalam <svg width="0" height="0" style="position:absolute"><defs>...</defs></svg>
//   2. goldBar100(cx, cy, tinggi, {rot, serial}) memulangkan <g> SVG.

const GOLDBAR100_DEFS = `
<linearGradient id="g100F" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FFE98A"/><stop offset=".28" stop-color="#F6C743"/>
  <stop offset=".6" stop-color="#E0A11A"/><stop offset="1" stop-color="#B8780B"/>
</linearGradient>
<linearGradient id="g100Rim" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FFF4B8"/><stop offset=".5" stop-color="#E9B52F"/><stop offset="1" stop-color="#9A6208"/>
</linearGradient>
<linearGradient id="g100Side" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="#D79A14"/><stop offset="1" stop-color="#8F5806"/>
</linearGradient>
<linearGradient id="g100Gloss" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
</linearGradient>
<filter id="g100Blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>`;

function g100Text(x, y, size, txt, opts = {}) {
  const { anchor = 'middle', style = '', weight = 800, family = 'Inter', spacing = 0 } = opts;
  const f = `font-family="${family}" font-weight="${weight}" font-size="${size}" text-anchor="${anchor}" letter-spacing="${spacing}" ${style}`;
  return `<text x="${x - size * 0.03}" y="${y - size * 0.03}" ${f} fill="#FFF3B0" opacity=".85">${txt}</text>` +
         `<text x="${x + size * 0.03}" y="${y + size * 0.04}" ${f} fill="#6E4608" opacity=".6">${txt}</text>` +
         `<text x="${x}" y="${y}" ${f} fill="#EDB52C">${txt}</text>`;
}

// Lambang bunga raya dalam pentagon (cop pengesahan generik berasaskan bentuk sebenar).
function g100Hibiscus(cx, cy, r) {
  let pent = '', pet = '';
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    pent += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1);
    const px = cx + r * 0.42 * Math.cos(a), py = cy + r * 0.42 * Math.sin(a);
    pet += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(r * 0.3).toFixed(1)}" fill="#EDB52C" stroke="#8A5400" stroke-width="${(r * 0.05).toFixed(1)}"/>`;
  }
  return `<path d="${pent}Z" fill="none" stroke="#8A5400" stroke-width="${(r * 0.1).toFixed(1)}" stroke-linejoin="round"/>` + pet +
         `<circle cx="${cx}" cy="${cy}" r="${(r * 0.12).toFixed(1)}" fill="#8A5400"/>`;
}

function goldBar100(cx, cy, h, opts = {}) {
  const { rot = 0, serial = 'B  26000000' } = opts;
  const W = 620, H = 1000;           // nisbah 0.62
  const s = h / H;
  const rr = 52, dx = 26, dy = 22;   // ketebalan nipis
  const hx = 0, hy = 600;            // pusat kotak cop
  return `<g transform="translate(${cx},${cy}) rotate(${rot}) scale(${s})">
    <rect x="${-W / 2 + 14}" y="${-H / 2 + 40}" width="${W}" height="${H}" rx="${rr}" fill="#0A2A6A" opacity=".32" filter="url(#g100Blur)"/>
    <rect x="${-W / 2 + dx}" y="${-H / 2 + dy}" width="${W}" height="${H}" rx="${rr}" fill="url(#g100Side)" stroke="#7A4A04" stroke-width="5"/>
    <rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}" rx="${rr}" fill="url(#g100F)" stroke="#B87400" stroke-width="6"/>
    <rect x="${-W / 2 + 22}" y="${-H / 2 + 22}" width="${W - 44}" height="${H - 44}" rx="${rr - 16}" fill="none" stroke="url(#g100Rim)" stroke-width="12"/>
    <rect x="${-W / 2 + 40}" y="${-H / 2 + 40}" width="${W - 80}" height="${H - 80}" rx="${rr - 28}" fill="none" stroke="#7A4A04" stroke-width="3" opacity=".5"/>
    <polygon points="${-W / 2 + 70},${-H / 2 + 20} ${-W / 2 + 230},${-H / 2 + 20} ${-W / 2 + 60},${H / 2 - 20} ${-W / 2 + 20},${H / 2 - 20}" fill="url(#g100Gloss)"/>
    <path d="M ${-W / 2 + 60} ${-H / 2 + 60} L ${W / 2 - 60} ${-H / 2 + 60}" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".35"/>
    ${g100Text(10, -H / 2 + 190, 92, 'Public', { family: 'DejaVu Serif, Georgia, serif', style: 'font-style="italic"', weight: 700 })}
    ${g100Text(-20, -H / 2 + 280, 108, 'Gold', { family: 'DejaVu Serif, Georgia, serif', style: 'font-style="italic"', weight: 700 })}
    <path d="M ${-W / 2 + 120} ${-H / 2 + 320} Q ${-W / 2 + 60} ${-H / 2 + 350} ${-W / 2 + 130} ${-H / 2 + 366} Q ${W / 2 - 160} ${-H / 2 + 392} ${W / 2 - 110} ${-H / 2 + 334}" fill="none" stroke="#EDB52C" stroke-width="9" stroke-linecap="round"/>
    ${g100Text(0, -40, 84, '100g')}
    ${g100Text(0, 62, 84, '999.9')}
    ${g100Text(0, 170, 84, 'FINE GOLD', { spacing: 1 })}
    <g transform="translate(${hx},280)">
      <rect x="-190" y="-62" width="380" height="124" rx="6" fill="none" stroke="#8A5400" stroke-width="7"/>
      <rect x="-186" y="-66" width="380" height="124" rx="6" fill="none" stroke="#FFF3B0" stroke-width="3" opacity=".85"/>
      <line x1="-30" y1="-62" x2="-30" y2="62" stroke="#8A5400" stroke-width="6"/>
      ${g100Hibiscus(-110, 0, 46)}
      <text x="80" y="-6" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#8A5400">PENANG</text>
      <text x="80" y="34" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#8A5400">ASSAYER</text>
    </g>
    <g transform="translate(0,${H / 2 - 96})">
      <rect x="${-W / 2 + 56}" y="-36" width="${W - 112}" height="72" rx="6" fill="#F8D870" stroke="#8A5400" stroke-width="5" opacity=".95"/>
      <text x="0" y="16" text-anchor="middle" font-family="Inter" font-weight="800" font-size="46" letter-spacing="3" fill="#7A4A04">${serial}</text>
    </g>
  </g>`;
}

if (typeof module !== 'undefined') module.exports = { GOLDBAR100_DEFS, goldBar100 };

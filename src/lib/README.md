# Komponen grafik emas (untuk video akan datang)

- `goldbar.js`: jongkong 250g tegak, permukaan tuang matte, "250g / GOLD / 999.9" timbul, cop pengesahan generik dan nombor siri.
- `golddinar.js`: dinar 10 (42.5g Au 999.9), tepi berfacet 12 sisi, cincin titik, bunga teratai timbul, teks melengkung.
- `preview.png`: pratonton kedua-duanya di latar gelap dan pastel.

Kedua-dua tanpa logo atau nama jenama. Letak `GOLDBAR_DEFS` dan `GOLDDINAR_DEFS` sekali dalam `<defs>` SVG tersembunyi (bukan `display:none`), kemudian panggil `goldBar(cx, cy, tinggi, {rot})` dan `goldDinar(cx, cy, jejari)`.

Video sedia ada belum menggunakan komponen ini.

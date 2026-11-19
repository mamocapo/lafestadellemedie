// Genera index.html e trasparenza.html a partire da progetti.mjs.
// Uso: node strumenti/costruisci.mjs

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { progetti, ente } from './progetti.mjs';

const radice = join(dirname(fileURLToPath(import.meta.url)), '..');

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

function giorno(iso) {
  const [a, m, g] = iso.split('-').map(Number);
  const d = new Date(Date.UTC(a, m - 1, g));
  return { a, m, g, sett: GIORNI[d.getUTCDay()], mese: MESI[m - 1], t: d.getTime() };
}

function inLettere(n) {
  const u = ['', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci',
    'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];
  const d = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];
  if (n < 20) return u[n];
  const dec = d[Math.floor(n / 10)], un = n % 10;
  if (un === 0) return dec;
  return (un === 1 || un === 8 ? dec.slice(0, -1) : dec) + u[un];
}
const maiuscola = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------- partitura

// Due disegni dello stesso calendario: "largo" con i paesi a sinistra,
// "stretto" (telefono) con i paesi sopra ogni riga.
function disegno(stretto) {
  const inizio = Date.UTC(2026, 6, 1);            // 1 luglio
  const giorniTot = 62;                           // fino al 31 agosto
  const W = stretto ? 400 : 1000;
  const X0 = stretto ? 10 : 200, X1 = stretto ? 390 : 984;
  const TOP = stretto ? 30 : 46, RIGA = stretto ? 52 : 54;
  const R = stretto ? { una: 4, piu: 6, alba: 6 } : { una: 6, piu: 8.5, alba: 9 };
  const dx = (X1 - X0) / (giorniTot - 1);
  const x = (t) => X0 + ((t - inizio) / 86400000) * dx;
  const yAsse = TOP + RIGA * progetti.length + 6;
  const H = yAsse + (stretto ? 34 : 38);

  let svg = '';
  const agosto = x(Date.UTC(2026, 7, 1));
  svg += `<text class="p-mese" x="${X0}" y="${stretto ? 14 : 20}">luglio</text>`;
  svg += `<text class="p-mese" x="${agosto.toFixed(1)}" y="${stretto ? 14 : 20}">agosto</text>`;
  svg += `<line class="p-confine" x1="${(agosto - dx / 2).toFixed(1)}" y1="${TOP - 16}" x2="${(agosto - dx / 2).toFixed(1)}" y2="${yAsse}"/>`;

  for (let i = 0; i < giorniTot; i++) {
    const g = new Date(inizio + i * 86400000).getUTCDate();
    const xi = (X0 + i * dx).toFixed(1);
    const lungo = g === 1 || g === 10 || g === 20;
    if (stretto && !lungo && g % 5 !== 0) continue;
    svg += `<line class="p-tacca" x1="${xi}" y1="${yAsse}" x2="${xi}" y2="${yAsse + (lungo ? 9 : 4)}"/>`;
    if (lungo) svg += `<text class="p-num" x="${xi}" y="${yAsse + (stretto ? 24 : 26)}">${g}</text>`;
  }

  progetti.forEach((p, r) => {
    const y = stretto ? TOP + RIGA * r + 36 : TOP + RIGA * r + RIGA / 2;
    svg += stretto
      ? `<text class="p-luogo" x="${X0}" y="${y - 14}">${esc(p.luogo)}</text>`
      : `<text class="p-luogo" x="0" y="${y + 7}">${esc(p.luogo)}</text>`;
    svg += `<line class="p-rigo" x1="${X0 - (stretto ? 4 : 10)}" y1="${y}" x2="${X1 + (stretto ? 4 : 10)}" y2="${y}"/>`;

    const perGiorno = new Map();
    for (const a of p.appuntamenti) {
      if (!perGiorno.has(a.data)) perGiorno.set(a.data, []);
      perGiorno.get(a.data).push(a);
    }
    for (const [data, lista] of perGiorno) {
      const gg = giorno(data);
      const xi = x(gg.t);
      const i = Math.round((gg.t - inizio) / 86400000);
      const titolo = `${gg.sett} ${gg.g} ${gg.mese}, ${p.luogo}` +
        (lista[0].testo ? ': ' + lista.map((a) => a.testo.split(':')[0].replace(/\.$/, '')).join('; ') : `: ${p.titolo}`);
      const forma = lista.some((a) => a.alba)
        ? `<path class="p-alba" d="M${(xi - R.alba).toFixed(1)} ${y} A${R.alba} ${R.alba} 0 0 1 ${(xi + R.alba).toFixed(1)} ${y} Z"/>`
        : `<circle class="p-nota" cx="${xi.toFixed(1)}" cy="${y}" r="${lista.length > 1 ? R.piu : R.una}"/>`;
      svg += `<g class="p-evento" style="--i:${i}"><title>${esc(titolo)}</title>${forma}</g>`;
    }
  });
  return `<svg class="partitura ${stretto ? 'stretta' : 'larga'}" viewBox="0 0 ${W} ${H}" role="img" aria-label="ETICHETTA">${svg}</svg>`;
}

function partitura() {
  const tot = progetti.reduce((n, p) => n + p.appuntamenti.length, 0);
  const etichetta = esc(`Calendario dell’estate 2026: ${tot} date tra il 4 luglio e il 29 agosto a ` +
    progetti.map((p) => p.luogo).join(', ').replace(/, ([^,]*)$/, ' e $1') + '.');
  const svg = (disegno(false) + '\n      ' + disegno(true))
    .replace(/ETICHETTA/g, etichetta);
  return { tot, svg };
}

// ---------------------------------------------------------------- pezzi comuni

function testa({ titolo, descrizione, pagina }) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titolo)}</title>
<meta name="description" content="${esc(descrizione)}">
<meta name="robots" content="noindex">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/literata.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="stile.css">
</head>
<body class="${pagina}">
<a class="salta" href="#contenuto">Vai al contenuto</a>
<header class="barra">
  ${pagina === 'home' ? '<span></span>' : '<a class="marchio" href="index.html">La Festa delle Medie</a>'}
  <nav aria-label="Principale">
    <ul>
      <li><a href="${pagina === 'home' ? '' : 'index.html'}#progetti">Progetti</a></li>
      <li><a href="${pagina === 'home' ? '' : 'index.html'}#chi-siamo">Chi siamo</a></li>
      <li><a href="trasparenza.html"${pagina === 'trasparenza' ? ' aria-current="page"' : ''}>Trasparenza</a></li>
    </ul>
  </nav>
</header>
`;
}

function piede() {
  return `<footer class="piede">
  <div class="piede-ente">
    <p class="piede-nome">${esc(ente.denominazione)}</p>
    <p>${esc(ente.sede)}</p>
    <p>Codice fiscale ${ente.cf}<br>Partita IVA ${ente.piva}</p>
    <p>Iscritta al Registro unico nazionale del Terzo settore, n. ${ente.runts}</p>
  </div>
  <div class="piede-contatti">
    <p><a href="mailto:${ente.email}">${ente.email}</a></p>
    <p>PEC <a href="mailto:${ente.pec}">${ente.pec}</a></p>
    <p>Telefono <a href="tel:+39${ente.tel.replace(/\s/g, '')}">${ente.tel}</a></p>
    <p><a href="trasparenza.html">Trasparenza</a></p>
  </div>
</footer>
</body>
</html>
`;
}

// ---------------------------------------------------------------- homepage

function progettoHtml(p) {
  const conTesto = p.appuntamenti.filter((a) => a.testo);
  let programma = '';
  if (conTesto.length) {
    const voci = conTesto.map((a) => {
      const g = giorno(a.data);
      const dt = a.ora ? `${a.data}T${a.ora.replace('.', ':').padStart(5, '0')}` : a.data;
      const quando = `${g.sett} ${g.g} ${g.mese}` + (a.ora ? `, ${a.ora}` : '');
      return `<li${a.alba ? ' class="alba"' : ''}><time datetime="${dt}">${quando}</time><span>${esc(a.testo)}</span></li>`;
    }).join('\n          ');
    programma = `
      <details class="programma">
        <summary>Programma <span>${conTesto.length} appuntament${conTesto.length === 1 ? 'o' : 'i'}</span></summary>
        <ol>
          ${voci}
        </ol>
      </details>`;
  }
  return `
    <article class="progetto" id="${p.id}">
      <div class="progetto-dove">
        <p class="luogo">${esc(p.luogo)}</p>
        <p class="periodo">${esc(p.periodo)}</p>
      </div>
      <div class="progetto-corpo">
        <h3>${esc(p.titolo)}</h3>${p.sottotitolo ? `\n        <p class="sottotitolo">${esc(p.sottotitolo)}</p>` : ''}
        ${p.testo.map((t) => `<p>${esc(t)}</p>`).join('\n        ')}
        <p class="crediti">${esc(p.crediti)}</p>${programma}
      </div>
    </article>`;
}

function home() {
  const { tot, svg } = partitura();
  const paesi = inLettere(progetti.length);
  return testa({
    titolo: 'La Festa delle Medie',
    descrizione: 'Associazione di Viterbo che organizza festival, concerti e spettacoli nei paesi della Tuscia.',
    pagina: 'home',
  }) + `
<main id="contenuto">
  <section class="apertura">
    <h1>La Festa<br>delle Medie</h1>
    <p class="motto">Festival, concerti e teatro nei paesi della Tuscia.</p>
  </section>

  <section class="estate" aria-labelledby="estate-titolo">
    <div class="estate-testa">
      <h2 id="estate-titolo">L’estate 2026</h2>
      <p>${maiuscola(inLettere(tot))} date in ${paesi} paesi, dal 4 luglio al 29 agosto.</p>
    </div>
    <div class="partitura-box">
      ${svg}
    </div>
    <ul class="legenda">
      <li><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6"/></svg>una data</li>
      <li><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.5"/></svg>più appuntamenti nello stesso giorno</li>
      <li><svg viewBox="0 0 20 20" aria-hidden="true"><path class="alba" d="M1 14 A9 9 0 0 1 19 14 Z"/><line x1="0" y1="14" x2="20" y2="14"/></svg>concerto all’alba</li>
    </ul>
  </section>

  <section class="progetti" id="progetti" aria-labelledby="progetti-titolo">
    <h2 id="progetti-titolo">Progetti</h2>
    ${progetti.map(progettoHtml).join('\n')}
  </section>

  <section class="chi" id="chi-siamo" aria-labelledby="chi-titolo">
    <h2 id="chi-titolo">Chi siamo</h2>
    <div class="chi-testo">
      <p>La Festa delle Medie è un’associazione con sede a Viterbo, attiva dal 2017 e iscritta al Registro unico nazionale del Terzo settore. Organizza festival, concerti e spettacoli nei paesi della Tuscia, spesso in luoghi che di solito non ospitano spettacoli: belvedere, giardini, piazze minori.</p>
      <p>Per i Comuni cura la direzione artistica, l’organizzazione e la comunicazione degli eventi, lavorando con le associazioni del territorio e con artisti professionisti.</p>
    </div>
  </section>
</main>

` + piede();
}

// ---------------------------------------------------------------- trasparenza

function trasparenza() {
  const righe = [
    ['Denominazione', 'Associazione «La Festa delle Medie» – ETS'],
    ['Forma giuridica', 'Associazione non riconosciuta'],
    ['Registro unico nazionale del Terzo settore', `Iscritta dal 30 maggio 2025 nella sezione «Altri enti del Terzo settore», repertorio n.\u00a0${ente.runts}`],
    ['Sede legale', ente.sede],
    ['Codice fiscale', ente.cf],
    ['Partita IVA', ente.piva],
    ['PEC', `<a href="mailto:${ente.pec}">${ente.pec}</a>`],
    ['Presidente e legale rappresentante', 'Stefano Mecocci'],
    ['Statuto', 'Registrato all’Agenzia delle Entrate, ufficio di Viterbo, il 19 marzo 2024 (n.\u00a0455, serie\u00a03)'],
  ];
  return testa({
    titolo: 'Trasparenza – La Festa delle Medie',
    descrizione: 'Dati dell’associazione La Festa delle Medie ETS e informazioni pubblicate ai sensi di legge.',
    pagina: 'trasparenza',
  }) + `
<main id="contenuto" class="pagina">
  <h1>Trasparenza</h1>

  <section aria-labelledby="ente-titolo">
    <h2 id="ente-titolo">L’associazione</h2>
    <dl class="dati">
      ${righe.map(([k, v]) => `<div><dt>${k}</dt><dd>${v.startsWith('<a') ? v : esc(v)}</dd></div>`).join('\n      ')}
    </dl>
  </section>

  <!--
  SEZIONI DA ATTIVARE QUANDO CI SONO I DATI (togliere i segni di commento).

  Contributi pubblici incassati (art. 1, commi 125-129, legge 124/2017):
  da pubblicare entro il 30 giugno dell'anno successivo all'incasso,
  se nell'anno i contributi incassati arrivano almeno a 10.000 euro.

  <section aria-labelledby="contributi-titolo">
    <h2 id="contributi-titolo">Contributi pubblici incassati</h2>
    <p>Sovvenzioni, contributi e vantaggi economici ricevuti da pubbliche amministrazioni, ai sensi dell’art. 1, commi 125-129, della legge 4 agosto 2017, n. 124.</p>
    <h3>Anno 2026</h3>
    <table class="tabella">
      <thead><tr><th scope="col">Ente erogatore</th><th scope="col">Causale</th><th scope="col">Data di incasso</th><th scope="col">Importo</th></tr></thead>
      <tbody>
        <tr><td></td><td></td><td></td><td></td></tr>
      </tbody>
    </table>
  </section>

  Compensi (art. 14, comma 2, D.Lgs. 117/2017): obbligatori se le entrate
  annue superano 100.000 euro. Compensi a componenti degli organi di
  amministrazione e controllo, dirigenti e associati, anche in forma anonima.

  <section aria-labelledby="compensi-titolo">
    <h2 id="compensi-titolo">Compensi agli organi sociali e agli associati</h2>
    <p>Ai sensi dell’art. 14, comma 2, del decreto legislativo 3 luglio 2017, n. 117.</p>
    <table class="tabella">
      <thead><tr><th scope="col">Ruolo</th><th scope="col">Anno</th><th scope="col">Importo lordo</th></tr></thead>
      <tbody>
        <tr><td></td><td></td><td></td></tr>
      </tbody>
    </table>
  </section>

  Documenti (statuto, rendiconti): pubblicazione facoltativa; i file vanno nella cartella documenti/.

  <section aria-labelledby="documenti-titolo">
    <h2 id="documenti-titolo">Documenti</h2>
    <ul class="documenti">
      <li><a href="documenti/statuto.pdf">Statuto</a></li>
    </ul>
  </section>
  -->
</main>

` + piede();
}

writeFileSync(join(radice, 'index.html'), home());
writeFileSync(join(radice, 'trasparenza.html'), trasparenza());
console.log('index.html e trasparenza.html aggiornati');

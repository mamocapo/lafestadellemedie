// I progetti mostrati in homepage, nell'ordine in cui compaiono.
// Ogni appuntamento ha una data (AAAA-MM-GG); "alba: true" lo segna
// come concerto all'alba. Gli appuntamenti senza testo compaiono solo
// nella partitura dell'estate, non nel programma.
// Dopo ogni modifica: node strumenti/costruisci.mjs

export const progetti = [
  {
    id: 'estate-laterese',
    titolo: 'Estate Laterese 2026',
    luogo: 'Latera',
    periodo: 'dal 4 luglio al 29 agosto 2026',
    testo: [
      'Due mesi di appuntamenti a ingresso libero nelle piazze del paese, al Parco dei Castagneti e sul belvedere di via Diaz: lirica, jazz e pop, teatro per adulti e per bambini, cinema all’aperto, incontri con gli autori e i racconti dell’Archivio storico fotografico per le vie del centro.',
    ],
    crediti: 'Per il Comune di Latera, con il contributo della Regione Lazio. Con l’Associazione Archeologica I Latera, la Banda musicale Città di Latera e l’Associazione Opera APS di Roma.',
    appuntamenti: [
      { data: '2026-07-04', ora: '5.30', alba: true, testo: 'Concerto all’alba al belvedere di via Diaz con il Pierotti Olivieri Duo: Francesco Pierotti al contrabbasso, Angelo Olivieri alla tromba. A seguire, colazione per tutti.' },
      { data: '2026-07-05', ora: '10.00', testo: 'Colazione con l’autore in piazza IV Novembre: Alessandra Sabbatini incontra Roberta Lepri.' },
      { data: '2026-07-05', ora: '21.00', testo: 'Concerto lirico in piazza San Clemente con Delfo Paone, tenore, e Davide Dellisanti, pianoforte.' },
      { data: '2026-07-11', ora: '21.00', testo: 'Black Smoke in piazza IV Novembre: Giulia Antonelli, voce, e Mario Pireddu, chitarra.' },
      { data: '2026-07-12', ora: '21.30', testo: 'Cinema in piazza del Volontariato e del Soccorso.' },
      { data: '2026-07-18', ora: '10.00', testo: 'Visita ai murales del paese.' },
      { data: '2026-07-18', ora: '18.00', testo: 'Sveva Live al Parco dei Castagneti: Sveva Bottarini, voce, William Tomassetti, chitarra e tastiere, Edoardo Rapaccini, chitarra.' },
      { data: '2026-07-19', ora: '21.00', testo: '«Quando la radio cantava» al Centro polivalente: Laura Leo, voce, e Gianfranco Pirroni, fisarmonica.' },
      { data: '2026-07-26', ora: '9.00', testo: 'Escursione con l’Associazione Archeologica I Latera.' },
      { data: '2026-07-26', ora: '21.00', testo: '«Da Dante ai giorni nostri, una riflessione sull’esistenza», performance teatrale di Matteo Fratarcangeli in piazza San Clemente.' },
      { data: '2026-07-31', ora: '17.30', testo: 'Al Parco dei Castagneti, animazione per bambini a tema ecologico e, alle 18.30, «Le memorie di un Tarabusino» di e con Valerio De Angelis.' },
      { data: '2026-08-01', ora: '18.30', testo: '«Il coraggio di re Nasone», teatro per bambini al Parco dei Castagneti con Deborah Caroscioli e Nicholas Verdozzi, regia di Gianni Pontillo.' },
      { data: '2026-08-01', ora: '21.30', testo: 'I racconti dell’Archivio storico fotografico per le vie del centro, con la premiazione in piazza della Rocca.' },
      { data: '2026-08-02', ora: '21.00', testo: '«Meraviglioso. Un amore alla Domenico Modugno» al Centro polivalente, con Gianni Pontillo e Deborah Caroscioli.' },
      { data: '2026-08-07', ora: '21.30', testo: '«Parole, musica e bellezza» in piazza San Clemente: Isabella Alfano, voce, Stefano Indino, fisarmonica, Alessandro Cica, voce.' },
      { data: '2026-08-14', ora: '21.30', testo: 'The Italian Job in concerto in piazza San Sebastiano.' },
      { data: '2026-08-22', ora: '21.30', testo: 'Concerto della Banda musicale Città di Latera in piazza della Rocca.' },
      { data: '2026-08-29', ora: '21.00', testo: 'Grafica in concerto in piazza Sebastiano Preta.' },
    ],
  },
  {
    id: 'fermento',
    titolo: 'Fermento',
    sottotitolo: 'Vini naturali e memorie di lago',
    luogo: 'Grotte di Castro',
    periodo: 'dal 17 al 19 luglio 2026',
    testo: [
      'Il festival dei vini naturali e dei prodotti del Lago di Bolsena. La terza edizione si è tenuta a Grotte di Castro, con la Casa di Comunità come base e le cantine del centro storico aperte al pubblico: quattro vignaioli, quattro cantine, circa centocinquanta persone a sera.',
      'Le prime due edizioni si sono svolte a Capodimonte; la seconda, la Winter Edition, dal 19 al 21 dicembre 2025.',
    ],
    crediti: 'Con il contributo di ARSIAL e della Regione Lazio.',
    appuntamenti: [
      { data: '2026-07-17' },
      { data: '2026-07-18' },
      { data: '2026-07-19' },
    ],
  },
  {
    id: 'estate-al-lago',
    titolo: 'Un’Estate al Lago 2026',
    luogo: 'Capodimonte',
    periodo: 'dal 29 luglio al 22 agosto 2026',
    testo: [
      'Cinque appuntamenti nel centro storico, tra Largo del Pero e i Giardini di via della Rocca affacciati sul Lago di Bolsena: musica d’autore, teatro di narrazione e due concerti all’alba. Ingresso libero.',
    ],
    crediti: 'Per il Comune di Capodimonte, con il contributo della Regione Lazio.',
    appuntamenti: [
      { data: '2026-07-29', ora: '21.30', testo: '«Parole, musica e bellezza» in Largo del Pero: Isabella Alfano, voce, Stefano Indino, fisarmonica, Alessandro Cica, voce.' },
      { data: '2026-08-01', ora: '6.00', alba: true, testo: 'Concerto all’alba ai Giardini di via della Rocca: Step Two, con Giovanni Benvenuti al sax tenore e Francesco Pierotti al contrabbasso.' },
      { data: '2026-08-09', ora: '21.30', testo: 'Sveva Live ai Giardini di via della Rocca: Sveva Bottarini, voce, e William Tomassetti, chitarra.' },
      { data: '2026-08-20', ora: '21.30', testo: '«Briganti», teatro di narrazione di e con Pietro Benedetti, in Largo del Pero.' },
      { data: '2026-08-22', ora: '6.15', alba: true, testo: 'Concerto all’alba ai Giardini di via della Rocca: Sara Dominici e Massimo Perciaccante, pianoforte a quattro mani.' },
    ],
  },
  {
    id: 'ferragosto-bomarzo',
    titolo: 'Festa di Ferragosto 2026',
    luogo: 'Bomarzo',
    periodo: 'dall’11 al 15 agosto 2026',
    testo: [
      'Tre concerti in tre luoghi e a tre ore diverse della settimana di Ferragosto: la sera in piazza Dante, l’alba nella frazione di Mugnano in Teverina, il pomeriggio del 15 agosto in piazza Duomo.',
    ],
    crediti: 'Per il Comune di Bomarzo, con il contributo del Consiglio regionale del Lazio.',
    appuntamenti: [
      { data: '2026-08-11', testo: 'Sveva in piazza Dante: pop d’autore in voce e chitarra.' },
      { data: '2026-08-14', ora: '6.00', alba: true, testo: 'Concerto all’alba in piazzetta della Torre a Mugnano in Teverina: Step Two, sax tenore e contrabbasso.' },
      { data: '2026-08-15', ora: '18.00', testo: 'Arie d’opera in piazza Duomo, con soprano, tenore e pianoforte.' },
    ],
  },
];

export const ente = {
  denominazione: 'La Festa delle Medie ETS',
  sede: 'Via L. Murialdo 11, 01100 Viterbo',
  cf: '90123560568',
  piva: '02258350566',
  runts: '153135',
  email: 'lafestadellemedie24@gmail.com',
  pec: 'lafestadellemedie@pec.net',
  tel: '335 1354905',
};

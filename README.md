# Sandvika Gjenbruk

Nettside / utstillingsvindu for Sandvika Gjenbruk – en gjenbruksbutikk rett ved Sandvika stasjon.

## Funksjoner

- **Forside** med hero, featured objekter, om oss og kontakt
- **Utstilling** med filter på kategorier
- **Admin-panel** (passordbeskyttet) for å:
  - Lage og slette kategorier
  - Legge ut objekter med tittel, beskrivelse, pris, kategori og bilde-URL
  - Slette objekter

Dette er **ikke** en nettbutikk – kun et oversiktlig utstillingsvindu.

## Kom i gang

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

### Admin

Gå til `/admin`. Standard passord: `sandvika2025`

Endre passord ved å sette miljøvariabelen `ADMIN_PASSWORD`.

## Data

Objekter og kategorier lagres i `data/items.json`. Filen kan redigeres manuelt eller via admin-panelet.

## Deploy

Enkel deploy på Vercel, Netlify eller egen server. Sørg for at `data/`-mappen er skrivbar hvis du bruker admin.

## Sosiale medier

Erstatt Instagram- og Facebook-lenkene i `Footer.tsx` og på forsiden med de ekte profilene til Sandvika Gjenbruk.

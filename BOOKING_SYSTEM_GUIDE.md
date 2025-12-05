# Veiledning for bookingsystemet

Dette dokumentet forklarer hvordan du kan endre innstillinger for bookingsystemet, inkludert spilleperioder, tidspunkter og e-postmottaker.

## 1. Endre spilleperioder og tidspunkter

Alle data om forestillingene ligger i filen `src/data/plays.json`. Denne filen styrer hvilke datoer som er tilgjengelige i kalenderen og hvilke klokkeslett som vises for hver ukedag.

### Filplassering
`src/data/plays.json`

### Format
Filen er i JSON-format. Hver forestilling ligger i listen `"plays"`.

Eksempel på en forestilling:
```json
{ 
  "id": "Ronja Røverdatter", 
  "name": "Ronja Røverdatter", 
  "start": "2026-01-29", 
  "end": "2026-03-01",
  "schedule": {
    "4": ["17:30"],
    "6": ["12:00", "15:00"],
    "0": ["12:00", "15:00"]
  }
}
```

### Forklaring av felter
*   **id**: Unik ID for forestillingen (brukes i koden).
*   **name**: Navnet som vises i listen for brukeren.
*   **start**: Dato for premiere (format: `ÅÅÅÅ-MM-DD`, f.eks. `2026-01-29`). Kalenderen vil ikke tillate valg før denne datoen.
*   **end**: Siste spilledato (format: `ÅÅÅÅ-MM-DD`).
*   **schedule**: Bestemmer hvilke ukedager og klokkeslett forestillingen spilles.
    *   Tallene representerer ukedager:
        *   `"0"` = Søndag
        *   `"1"` = Mandag
        *   `"2"` = Tirsdag
        *   `"3"` = Onsdag
        *   `"4"` = Torsdag
        *   `"5"` = Fredag
        *   `"6"` = Lørdag
    *   Listen bak tallet (f.eks. `["17:30"]`) er klokkeslettene som blir valgbare for den dagen.

### Legge til nye datoer/tider
For å legge til en forestilling på fredager kl 18:00, legger du til `"5": ["18:00"]` i `schedule`-blokken.

---

## 2. Endre mottaker av e-post

Når en bruker sender inn skjemaet, åpnes e-postprogrammet deres med en ferdig utfylt e-post. Mottakeradressen er definert i koden for skjemaet.

### Filplassering
`src/components/BookingForm.tsx`

### Slik endrer du adressen
1.  Åpne filen `src/components/BookingForm.tsx`.
2.  Søk etter teksten `mailto:`.
3.  Du vil finne en linje som ser slik ut (ca. linje 183):
    ```typescript
    window.location.href = `mailto:billett@fyllingsdalenteater.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    ```
4.  Endre `billett@fyllingsdalenteater.no` til ønsket e-postadresse.

---

## 3. Legge til ny forestilling i listen

For å legge til en helt ny forestilling i dropdown-menyen:

1.  Åpne `src/data/plays.json`.
2.  Legg til et nytt objekt i `"plays"`-listen med ny ID, navn, start/slutt-dato og sendeskjema.
3.  Husk at bookingsystemet automatisk validerer datoer basert på `start` og `end` du setter her.


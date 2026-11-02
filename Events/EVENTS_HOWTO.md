# Crescent Youth – events toevoegen

De kalender op `/Events/calendar.html` leest de evenementen uit `Events/events.json`.
Er is geen aparte kalenderdienst of betaald abonnement nodig.

## Een evenement toevoegen

1. Open `Events/events.json` in GitHub.
2. Voeg een nieuw object toe in de `events`-lijst. Zet tussen de objecten een komma.
3. Gebruik de echte datum (`YYYY-MM-DD`), tijd (`HH:MM`) en locatie.
4. Vul de inschrijvingslink in bij `registrationUrl` en zet `registrationOpen` op `true` wanneer inschrijven mogelijk is.
5. Vul bij `detailsUrl` een eventpagina in. De kalender toont een knop naar die pagina wanneer inschrijven niet mogelijk is.
6. Sla het bestand op. Na de GitHub Pages-update verschijnt het event automatisch in de juiste maand.

Voorbeeld (vervang alle voorbeeldgegevens door bevestigde informatie):

```json
{
  "id": "voorbeeld-2027-01-01",
  "date": "2027-01-01",
  "time": "14:00",
  "location": "Bevestigde locatie, Brugge",
  "category": "education",
  "title": {
    "nl": "Voorbeeldworkshop",
    "en": "Example workshop",
    "fr": "Atelier exemple",
    "ar": "ورشة مثال"
  },
  "detailsUrl": "/Events/Educationalevent.html",
  "registrationUrl": "https://example.org/your-real-event-form",
  "registrationOpen": true
}
```

De categorie is `education`, `sports`, `social` of `trips`.

**Belangrijk:** `Registration/Registration.html` is het formulier voor jaarlijks lidmaatschap, niet voor eventinschrijvingen. Gebruik de echte eventinschrijvingslink (bijvoorbeeld een Microsoft Form, Google Form of een aparte eventpagina).

Na de datum verschijnt het event bij **Afgelopen evenementen**. Een registratieknop verschijnt alleen voor een toekomstige datum én wanneer `registrationOpen` waar is én de link geldig is.

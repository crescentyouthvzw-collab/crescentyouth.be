# THE SPORTS ARENA — draft branch setup

Event: Sunday, 29 November 2026, 13:00–16:30  
Organiser: Crescent Youth vzw  
Planned venue: Buurtcentrum Xaverianen, Xaverianenstraat 13/3, 8200 Sint-Michiels, Brugge  
Status: **venue not finally confirmed; registration closed**

**Date clarification needed:** the organiser's latest message said "29 October", while the original plan and current site say **29 November 2026**. October 2026 has already passed. Leave the website/calendar on 29 November until the month is explicitly confirmed.

Current event schedule: **13:00–15:00 social games and connections**, then **15:00–16:30 sports**. No named prayer break appears in the public schedule; any break can be arranged later. The sports groups are separated with screening between the girls' and boys' sections. Public places and the registration cap: **35**.

## What has been prepared

- `/Events/sports-arena.html`: event details, programme, pricing and the Noble Journey-style registration form.
- `/Events/sports-arena.css` and `/Events/sports-arena.js`: responsive design and NL/EN/FR/AR translations.
- `/Events/sports-arena-config.js`: registration switch and SumUp/Google Apps Script URL slots.
- `/Events/sports-arena-apps-script.gs`: Google Sheet receiver to install separately.
- `/Events/sport.html`: upcoming-event card linked to the new page.
- `/Events/events.json`: calendar entry, currently linked to details rather than an open registration.

This work is on `feature/the-sports-arena-2026`, **not on the published main branch**.

## Registration data destination

New registration spreadsheet created under the organisers' new Google account:

https://docs.google.com/spreadsheets/d/1SjF_CqadSiCJIPO7w9F5A4lpjoL6b73hxf8FBP5hGOA/edit

Dedicated Apps Script project (created by the organiser under the new account):

https://script.google.com/u/8/home/projects/1sESGhCvHBUFKmuFx7Accy22oBhRGwgx0q2fMKpFqAVruqEgLmqqeLQyy/edit

The receiver creates a tab called **Sports Arena 2026** with these columns:

1. Created At
2. Registration ID
3. Event ID
4. Event Date
5. First Name
6. Last Name
7. Email
8. Phone
9. Member
10. Sports Section
11. Heard From
12. Consent
13. Price EUR
14. Payment Status
15. Payment Notes

We have **not accessed, edited or tested the spreadsheet itself**. The Apps Script must be installed and authorised by an account with edit access. Do not make the registration spreadsheet public.

## One-time Google Sheet connection

1. Sign in to the new Google account with edit permission on the new spreadsheet.
2. Open the dedicated Apps Script project linked above; do not modify the previous event's script.
3. Paste the updated contents of `sports-arena-apps-script.gs` into `Code.gs` and save. The new spreadsheet ID is already set in the source.
4. Leave `ARENA_REGISTRATION_OPEN = false` while configuring.
5. Run `setupSportsArenaSheet` once and approve Google's permissions. Verify that the **Sports Arena 2026** tab and headers were created.
6. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and use the access option that allows event visitors to submit without signing in (typically **Anyone**). Copy the URL ending in `/exec`.
7. [Done — 8 November 2026] The organiser deployed version 1 under the `crescentyouth.be` Workspace account. The `/exec` URL is configured in `googleScriptUrl` in `sports-arena-config.js`:

   https://script.google.com/macros/s/AKfycby6HIGE_O9C7W0U1MbvX9uUOlZ2MsPzLa9BGLiYslSlvXUz-pi164i1ckaC7x9lIy25WQ/exec

   The organiser confirmed that the URL is reachable from an InPrivate browser window (opening it via GET shows the expected `doGet`-not-found message because this script only implements `doPost`). The remaining browser POST/CORS test is still required before launch.

8. [Still needed] Confirm the endpoint can save a test registration and return JSON from an actual browser, including an incognito/non-Google-user session. Google's Apps Script redirects, Workspace access restrictions and cross-origin behaviour must be tested before launch.

**Important:** Publishing a new Apps Script version requires updating the deployment. GitHub commits do not deploy Google Apps Script.

## SumUp payments

The organisers supplied two active reusable SumUp payment links (amounts checked against their screenshots):

- Member: **€8** — https://pay.sumup.com/b2c/QAEK6E05
- Non-member: **€10** — https://pay.sumup.com/b2c/QFMILULQ

Both URLs are now configured in `sumupMemberUrl` and `sumupNonMemberUrl` in `sports-arena-config.js`. Keep the registration switch disabled until the sheet receiver is tested; attendees must register before redirecting to the appropriate link.

The form saves a registration first, then redirects to the matching SumUp link. The spreadsheet records **Pending SumUp payment**. It does **not** automatically mark a payment as received. Reconcile payments in SumUp before changing the Sheet payment status to confirmed. Do not mistake a submitted form for a paid ticket.

On-site entry is **€15 only if places remain**; this is not handled by the online form.

## Final launch sequence

Before opening registration:

- [ ] Confirm the sports hall (two sections) and Room C for the needed hours, including setup/cleanup.
- [ ] Confirm venue price, snacks/drinks and equipment. **Room C was previously quoted for 30; confirm a suitable arrangement for the newly planned 35 participants before opening registration.**
- [ ] Verify the planned physical screening between girls' and boys' sections works on site; the venue previously indicated that windows cannot be covered.
- [ ] Agree the age/guardian policy if minors can attend.
- [ ] Finalise social activities, sisters' sports and brothers' sports.
- [ ] Review the privacy notice and appropriate access/retention of participant data.
- [ ] Deploy and authorise the Apps Script and verify test rows in the specified Sheet.
- [x] Add the supplied €8 member and €10 non-member SumUp links to the website configuration.
- [ ] Test each SumUp link at launch and verify the intended amount and payment flow.
- [ ] Test both a member and a non-member registration end to end, including duplicate detection and the 35-place limit.
- [ ] Set `ARENA_REGISTRATION_OPEN = true` in Apps Script and redeploy it.
- [ ] Set `registrationOpen: true` in `sports-arena-config.js`.
- [ ] Set `registrationOpen: true` for the event in `Events/events.json`.
- [ ] Merge the reviewed GitHub branch into `main` only when the event is ready for public launch.

The page and calendar deliberately show the location as **provisional** until confirmed. No registration, payment or Sheet write is active from the GitHub branch as delivered.

## Content placeholders to finalise

- Actual social games, sisters' sports and brothers' sports.
- Confirmed venue times, cost and exact space allocation.
- Snack/drink arrangements, what to bring and participant age policy.
- Poster/hero imagery if desired.
- Final confirmation of the date/month, plus the 35-person venue arrangement.

## Testing and security notes

- Google Apps Script is a server-side receiver; the sheet ID is a file identifier, **not** a password.
- Avoid exposing OAuth tokens, Google credentials or private attendee data in the public GitHub repository.
- The included receiver validates input, blocks duplicate emails, holds a script lock and marks payments as pending; it does not provide CAPTCHA or verified SumUp webhook reconciliation.
- Apps Script needs to be accessible to visitors for the public form to work, so monitor registrations for abuse. A more robust service or CAPTCHA can be added if needed.
- The current form collects only necessary contact and participation preferences. Date of birth and an unconfirmed age restriction have deliberately not been added.

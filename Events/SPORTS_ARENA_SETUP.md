# THE SPORTS ARENA — draft branch setup

Event: Sunday, 29 November 2026, 13:00–16:30  
Organiser: Crescent Youth vzw  
Planned venue: Buurtcentrum Xaverianen, Xaverianenstraat 13/3, 8200 Sint-Michiels, Brugge  
Status: **venue not finally confirmed; registration closed**

## What has been prepared

- `/Events/sports-arena.html`: event details, programme, pricing and the Noble Journey-style registration form.
- `/Events/sports-arena.css` and `/Events/sports-arena.js`: responsive design and NL/EN/FR/AR translations.
- `/Events/sports-arena-config.js`: registration switch and SumUp/Google Apps Script URL slots.
- `/Events/sports-arena-apps-script.gs`: Google Sheet receiver to install separately.
- `/Events/sport.html`: upcoming-event card linked to the new page.
- `/Events/events.json`: calendar entry, currently linked to details rather than an open registration.

This work is on `feature/the-sports-arena-2026`, **not on the published main branch**.

## Registration data destination

Existing spreadsheet supplied by the organisers:

https://docs.google.com/spreadsheets/d/1Aw5vezIgw6hH_aTUshbXn9-fp9NjNuZQ4BRQ2XCfCdY/edit

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

1. Open the spreadsheet using its owner/editor account.
2. Go to **Extensions → Apps Script**.
3. Paste the contents of `sports-arena-apps-script.gs` into `Code.gs`.
4. Leave `ARENA_REGISTRATION_OPEN = false` while configuring.
5. Run `setupSportsArenaSheet` once and approve Google's permissions. Verify that the **Sports Arena 2026** tab and headers were created.
6. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and use the access option that allows event visitors to submit without signing in (typically **Anyone**). Copy the URL ending in `/exec`.
7. Add that URL to `googleScriptUrl` in `sports-arena-config.js`.
8. Confirm the endpoint can successfully save a test registration and return JSON in an actual browser. Google's Apps Script redirects and cross-origin behaviour must be tested before launch.

**Important:** Publishing a new Apps Script version requires updating the deployment. GitHub commits do not deploy Google Apps Script.

## SumUp payments

Create **two separate SumUp payment links**, each with the correct fixed amount:

- Member: **€8**
- Non-member: **€10**

Put them in `sumupMemberUrl` and `sumupNonMemberUrl` in `sports-arena-config.js`.

The form saves a registration first, then redirects to the matching SumUp link. The spreadsheet records **Pending SumUp payment**. It does **not** automatically mark a payment as received. Reconcile payments in SumUp before changing the Sheet payment status to confirmed. Do not mistake a submitted form for a paid ticket.

On-site entry is **€15 only if places remain**; this is not handled by the online form.

## Final launch sequence

Before opening registration:

- [ ] Confirm the sports hall (two sections) and Room C for the needed hours, including setup/cleanup.
- [ ] Confirm venue price, maximum capacity (Room C currently quoted as 30), prayer space, snacks/drinks and equipment.
- [ ] Confirm the sisters' sports privacy arrangements; the venue indicated that windows cannot be covered.
- [ ] Agree the age/guardian policy if minors can attend.
- [ ] Finalise social activities, sisters' sports and brothers' sports.
- [ ] Review the privacy notice and appropriate access/retention of participant data.
- [ ] Deploy and authorise the Apps Script and verify test rows in the specified Sheet.
- [ ] Create the two SumUp links and verify each charges the expected amount.
- [ ] Test both a member and a non-member registration end to end, including duplicate detection and the 30-place limit.
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
- Whether the maximum registration count should remain 30.

## Testing and security notes

- Google Apps Script is a server-side receiver; the sheet ID is a file identifier, **not** a password.
- Avoid exposing OAuth tokens, Google credentials or private attendee data in the public GitHub repository.
- The included receiver validates input, blocks duplicate emails, holds a script lock and marks payments as pending; it does not provide CAPTCHA or verified SumUp webhook reconciliation.
- Apps Script needs to be accessible to visitors for the public form to work, so monitor registrations for abuse. A more robust service or CAPTCHA can be added if needed.
- The current form collects only necessary contact and participation preferences. Date of birth and an unconfirmed age restriction have deliberately not been added.

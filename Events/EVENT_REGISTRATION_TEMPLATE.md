# Crescent Youth event registration layout

The reusable registration design is based on **The Noble Journey** page before its registration-closed change (the parent of commit `9f091661a6e6a0233e27048accfc7c695b93f6cf`, on 26 May 2026).

## Use this for a future event

1. Load the normal event-specific stylesheet, followed by `/Events/event-registration.css`.
2. Give the registration section the classes `section event-registration` and the ID `registration`.
3. Inside it, use a `.registration-layout` with a left `.price-box` and a right `.form-card`. The first card contains a `h3`, `.price-line` entries, and optional `.note` elements.
4. Keep form fields inside a `.membership-form` and use `.form-row` for pairs of fields. Keep accessible labels, required validation, an explicit privacy/terms checkbox, a `.status-box` for the chosen price, and a disabled-by-default submit button.
5. Use the event's own script for translations, server validation, duplicate handling, capacity, payment amount and safe SumUp redirection. **Never reuse an old event's Apps Script URL, Google Sheet, payment link, refund or age rules.**
6. Gate registrations on **both** the frontend and server until a real browser-to-Sheets test is successful and organisers approve opening registration.

## Current implementation

`sports-arena.html` is the example implementation. Its event fields are first name, last name, email, phone, member status, preferred sisters/brothers sports group, referral source and privacy consent. The backend enforces the current 35-place cap, and the script sends members to the €8 SumUp link or non-members to the €10 link only after a successful saved registration. On-site entry (€15) is not handled online.

The CSS intentionally scopes every component under `.event-registration`, so this shared look can be used alongside an event's own hero, programme and footer without overwriting unrelated pages.

## What to copy, and what to change

- **Copy:** registration section markup structure, shared CSS link, accessible label/input patterns, status area and mobile layout.
- **Change for each event:** page title, programme, date, venue, prices, available places, form choices, privacy/terms wording where needed, translations and server/payment endpoints.
- **Test:** keyboard and mobile layout, NL/EN/FR/AR content, disabled/open states, correct fee after selection, duplicate rejection, Sheets write, payment link amount and payment reconciliation.

The shared stylesheet is a visual component library, **not** a reusable backend. No form should accept real participant information until its event-specific integration is verified.

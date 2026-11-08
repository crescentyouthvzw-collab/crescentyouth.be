/**
 * THE SPORTS ARENA — Google Apps Script receiver for the registration form.
 *
 * Paste into the separate Sports Arena Apps Script project, then deploy as a
 * Web app running as the script owner. Keep the spreadsheet private.
 * This file is source code only; it is NOT deployed by GitHub Pages.
 */
const ARENA_SHEET_ID = '1SjF_CqadSiCJIPO7w9F5A4lpjoL6b73hxf8FBP5hGOA';
const ARENA_TAB = 'Sports Arena 2026';
const ARENA_EVENT_ID = 'the-sports-arena-2026';
const ARENA_EVENT_DATE = '2026-11-29';
const ARENA_MAX_REGISTRATIONS = 35;

// IMPORTANT: change to true only after venue approval, privacy review,
// successful end-to-end Sheet + SumUp tests, and a final launch decision.
const ARENA_REGISTRATION_OPEN = false;

const ARENA_HEADERS = [
  'Created At', 'Registration ID', 'Event ID', 'Event Date',
  'First Name', 'Last Name', 'Email', 'Phone', 'Member',
  'Sports Section', 'Heard From', 'Consent', 'Price EUR',
  'Payment Status', 'Payment Notes'
];

function setupSportsArenaSheet() {
  const spreadsheet = SpreadsheetApp.openById(ARENA_SHEET_ID);
  let sheet = spreadsheet.getSheetByName(ARENA_TAB);
  if (!sheet) sheet = spreadsheet.insertSheet(ARENA_TAB);
  if (sheet.getLastRow() > 0) {
    const existing = sheet.getRange(1, 1, 1, ARENA_HEADERS.length).getValues()[0];
    if (existing.join('|') !== ARENA_HEADERS.join('|')) {
      throw new Error('Existing tab headers do not match. Check manually before proceeding.');
    }
    return;
  }
  sheet.appendRow(ARENA_HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, ARENA_HEADERS.length)
    .setBackground('#1e3d2f').setFontColor('#ffffff').setFontWeight('bold');
  sheet.setColumnWidth(1, 155);
  sheet.setColumnWidth(3, 195);
  sheet.setColumnWidth(7, 235);
  sheet.setColumnWidth(14, 190);
}

function arenaResult_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function arenaSafeCell_(value, maxLength) {
  let text = String(value || '').replace(/[\r\n\t]/g, ' ').trim().slice(0, maxLength);
  // Prevent spreadsheet formula injection from untrusted form fields.
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function arenaValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 150;
}

function doPost(e) {
  if (!ARENA_REGISTRATION_OPEN) {
    return arenaResult_({ success: false, code: 'closed', message: 'Registration is not open.' });
  }
  let data;
  try {
    data = JSON.parse(e && e.postData && e.postData.contents || '{}');
  } catch (err) {
    return arenaResult_({ success: false, code: 'invalid', message: 'Invalid request.' });
  }

  // Honeypot: do not write automated submissions.
  if (data.website) return arenaResult_({ success: false, code: 'invalid', message: 'Invalid request.' });
  if (data.eventId !== ARENA_EVENT_ID || data.consent !== true) {
    return arenaResult_({ success: false, code: 'invalid', message: 'Event or consent is missing.' });
  }

  const firstName = arenaSafeCell_(data.firstName, 80);
  const lastName = arenaSafeCell_(data.lastName, 80);
  const email = String(data.email || '').trim().toLowerCase();
  const phone = arenaSafeCell_(data.phone, 30);
  const member = data.memberStatus;
  const section = data.sportsSection;
  const heardFrom = arenaSafeCell_(data.heardFrom, 150);

  if (!firstName || !lastName || !arenaValidEmail_(email) ||
      phone.replace(/\D/g, '').length < 6 ||
      !['Yes', 'No'].includes(member) ||
      !['Sisters', 'Brothers', 'Discuss'].includes(section)) {
    return arenaResult_({ success: false, code: 'invalid', message: 'Please check your details.' });
  }

  const fee = member === 'Yes' ? 8 : 10;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const spreadsheet = SpreadsheetApp.openById(ARENA_SHEET_ID);
    const sheet = spreadsheet.getSheetByName(ARENA_TAB);
    if (!sheet) throw new Error('Run setupSportsArenaSheet first.');
    if (sheet.getLastRow() < 1) throw new Error('Registration headers are missing.');
    const rows = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, ARENA_HEADERS.length).getValues()
      : [];

    if (rows.some(row => String(row[6]).trim().toLowerCase() === email && row[2] === ARENA_EVENT_ID)) {
      return arenaResult_({ success: false, code: 'duplicate', message: 'Email already registered.' });
    }
    if (rows.filter(row => row[2] === ARENA_EVENT_ID).length >= ARENA_MAX_REGISTRATIONS) {
      return arenaResult_({ success: false, code: 'full', message: 'Registration is full.' });
    }

    const registrationId = 'SA26-' + Utilities.getUuid().slice(0, 8).toUpperCase();
    sheet.appendRow([
      new Date(), registrationId, ARENA_EVENT_ID, ARENA_EVENT_DATE,
      firstName, lastName, arenaSafeCell_(email, 150), phone, member,
      section, heardFrom, 'Yes', fee, 'Pending SumUp payment', ''
    ]);
    SpreadsheetApp.flush();
    return arenaResult_({ success: true, registrationId: registrationId, amount: fee });
  } catch (err) {
    console.error(err);
    return arenaResult_({ success: false, code: 'server', message: 'Registration unavailable. Please contact the organisers.' });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

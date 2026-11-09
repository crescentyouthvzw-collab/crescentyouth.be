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

const ARENA_HEADERS = [
  'Created At', 'Registration ID', 'Event ID', 'Event Date',
  'First Name', 'Last Name', 'Email', 'Phone', 'Member',
  'Sports Section', 'Heard From', 'Consent', 'Price EUR',
  'Payment Status', 'Payment Notes', 'SumUp Checkout ID', 'Confirmation Sent At'
];

function setupSportsArenaSheet() {
  const spreadsheet = SpreadsheetApp.openById(ARENA_SHEET_ID);
  let sheet = spreadsheet.getSheetByName(ARENA_TAB);
  if (!sheet) sheet = spreadsheet.insertSheet(ARENA_TAB);
  if (sheet.getLastRow() > 0) {
    const existing = sheet.getRange(1, 1, 1, ARENA_HEADERS.length).getValues()[0];
    if (existing.slice(0, 15).join('|') !== ARENA_HEADERS.slice(0, 15).join('|') ||
        existing.slice(15).some((header, index) => header && header !== ARENA_HEADERS[15 + index])) {
      throw new Error('Existing tab headers do not match. Check manually before proceeding.');
    }
    sheet.getRange(1, 16, 1, 2).setValues([ARENA_HEADERS.slice(15)])
      .setBackground('#1e3d2f').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setColumnWidth(16, 245);
    sheet.setColumnWidth(17, 180);
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
  return /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(value) && value.length <= 150;
}

function arenaOpen_() {
  const settings = PropertiesService.getScriptProperties();
  return settings.getProperty('ARENA_REGISTRATION_OPEN') === 'true' &&
    Boolean(settings.getProperty('SUMUP_API_KEY') && settings.getProperty('SUMUP_MERCHANT_CODE'));
}

function doGet() {
  return arenaResult_({ registrationOpen: arenaOpen_() });
}

function doPost(e) {
  if (!arenaOpen_()) {
    return arenaResult_({ success: false, code: 'closed', message: 'Registration is not open.' });
  }
  let data;
  try {
    data = JSON.parse(e && e.postData && e.postData.contents || '{}');
  } catch (err) {
    return arenaResult_({ success: false, code: 'invalid', message: 'Invalid request.' });
  }

  return arenaProcessRegistration_(data);
}

// Shared by the live POST handler and the editor-only test. The public handler
// above still refuses requests while registration is closed.
function arenaProcessRegistration_(data, testOnly) {
  // Honeypot: do not write automated submissions.
  if (!data || typeof data !== 'object' || data.website) return arenaResult_({ success: false, code: 'invalid', message: 'Invalid request.' });
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

    if (rows.some(row => String(row[6]).trim().toLowerCase() === email && row[2] === ARENA_EVENT_ID && row[13] !== 'Expired')) {
      return arenaResult_({ success: false, code: 'duplicate', message: 'Email already registered.' });
    }
    if (rows.filter(row => row[2] === ARENA_EVENT_ID && row[13] !== 'Expired').length >= ARENA_MAX_REGISTRATIONS) {
      return arenaResult_({ success: false, code: 'full', message: 'Registration is full.' });
    }

    const registrationId = 'SA26-' + Utilities.getUuid().toUpperCase();
    const checkout = testOnly ? null : arenaCreateCheckout_(registrationId, fee);
    sheet.appendRow([
      new Date(), registrationId, ARENA_EVENT_ID, ARENA_EVENT_DATE,
      firstName, lastName, arenaSafeCell_(email, 150), phone, member,
      section, heardFrom, 'Yes', fee, 'Pending SumUp payment', '', checkout ? checkout.id : '', ''
    ]);
    SpreadsheetApp.flush();
    return arenaResult_({ success: true, registrationId: registrationId, amount: fee, paymentUrl: checkout ? checkout.hosted_checkout_url : null });
  } catch (err) {
    console.error(err);
    return arenaResult_({ success: false, code: 'server', message: 'Registration unavailable. Please contact the organisers.' });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

/**
 * Run manually from the Apps Script editor while registration is CLOSED.
 * Writes a dummy row through the normal validation path, verifies its saved
 * fields, then removes ONLY that exact row. Never triggers a SumUp payment.
 */
function testSportsArenaRegistration() {
  if (arenaOpen_()) {
    throw new Error('Close public registration before running this test.');
  }

  const testEmail = 'sports-arena-test-' + Utilities.getUuid().slice(0, 12).toLowerCase() + '@example.com';
  const result = JSON.parse(arenaProcessRegistration_({
    eventId: ARENA_EVENT_ID,
    firstName: 'TEST',
    lastName: 'Registration',
    email: testEmail,
    phone: '0400000000',
    memberStatus: 'Yes',
    sportsSection: 'Discuss',
    heardFrom: 'Internal registration test',
    consent: true,
    website: ''
  }, true).getContent());

  if (!result.success || result.amount !== 8 || !result.registrationId) {
    throw new Error('Test registration failed: ' + JSON.stringify(result));
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const sheet = SpreadsheetApp.openById(ARENA_SHEET_ID).getSheetByName(ARENA_TAB);
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) throw new Error('Test row not found. Check the sheet manually.');

    const saved = sheet.getRange(lastRow, 1, 1, ARENA_HEADERS.length).getValues()[0];
    if (saved[1] !== result.registrationId ||
        String(saved[6]).toLowerCase() !== testEmail ||
        saved[2] !== ARENA_EVENT_ID ||
        saved[12] !== 8 ||
        saved[13] !== 'Pending SumUp payment') {
      // Never delete an unverified row. If the check fails, an organiser can
      // locate the dummy entry by its registration ID and remove it manually.
      throw new Error('Verification failed. No row deleted. Locate test ID ' + result.registrationId);
    }

    sheet.deleteRow(lastRow);
    SpreadsheetApp.flush();
    Logger.log('PASS: registration %s was saved, verified and removed. No seat occupied; no payment sent.', result.registrationId);
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function arenaSumUp_(path, payload) {
  const key = PropertiesService.getScriptProperties().getProperty('SUMUP_API_KEY');
  if (!key) throw new Error('Missing SumUp API key.');
  const options = {
    headers: { Authorization: 'Bearer ' + key },
    muteHttpExceptions: true,
    followRedirects: false
  };
  if (payload) {
    options.method = 'post';
    options.contentType = 'application/json';
    options.payload = JSON.stringify(payload);
  }
  const response = UrlFetchApp.fetch('https://api.sumup.com/v0.1/checkouts' + path, options);
  if (response.getResponseCode() >= 300) {
    throw new Error('SumUp returned HTTP ' + response.getResponseCode());
  }
  return JSON.parse(response.getContentText());
}

function arenaCreateCheckout_(reference, amount) {
  const merchantCode = PropertiesService.getScriptProperties().getProperty('SUMUP_MERCHANT_CODE');
  const checkout = arenaSumUp_('', {
    checkout_reference: reference,
    merchant_code: merchantCode,
    amount: amount,
    currency: 'EUR',
    description: 'Crescent Youth - The Sports Arena',
    valid_until: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    hosted_checkout: { enabled: true },
    redirect_url: 'https://crescentyouth.be/Events/sports-arena.html#registration'
  });
  if (!checkout.id || !/^https:\/\/checkout\.sumup\.com\/pay\/[a-z0-9-]+$/i.test(checkout.hosted_checkout_url)) {
    throw new Error('SumUp did not return a hosted checkout.');
  }
  return checkout;
}

// Install once as the Crescent Youth Google Workspace account that sends mail.
function installSportsArenaPaymentCheck() {
  if (ScriptApp.getProjectTriggers().some(trigger =>
    trigger.getHandlerFunction() === 'checkSportsArenaPayments')) return;
  ScriptApp.newTrigger('checkSportsArenaPayments').timeBased().everyMinutes(5).create();
}

function checkSportsArenaPayments() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    const sheet = SpreadsheetApp.openById(ARENA_SHEET_ID).getSheetByName(ARENA_TAB);
    const rows = sheet.getDataRange().getValues();
    rows.slice(1).forEach((row, index) => {
      if (row[2] !== ARENA_EVENT_ID || !row[15] || row[16] || row[13] === 'Expired') return;
      try {
        arenaReconcilePayment_(sheet, index + 2, row);
      } catch (err) {
        console.error('Reconciliation failed for ' + row[1] + ': ' + err.message);
      }
    });
  } finally {
    SpreadsheetApp.flush();
    lock.releaseLock();
  }
}

function arenaReconcilePayment_(sheet, rowNumber, row) {
  const checkout = arenaSumUp_('/' + encodeURIComponent(row[15]));
  const merchant = PropertiesService.getScriptProperties().getProperty('SUMUP_MERCHANT_CODE');
  if (checkout.id !== row[15] || checkout.checkout_reference !== row[1] ||
      checkout.merchant_code !== merchant || checkout.currency !== 'EUR' ||
      Number(checkout.amount) !== Number(row[12])) {
    throw new Error('Checkout details do not match the registration.');
  }
  if (checkout.status === 'EXPIRED' && row[13] === 'Pending SumUp payment') {
    sheet.getRange(rowNumber, 14).setValue('Expired');
  }
  if (checkout.status !== 'PAID') return;

  sheet.getRange(rowNumber, 14, 1, 2).setValues([['Paid', 'Verified by SumUp']]);
  SpreadsheetApp.flush();
  arenaSendConfirmation_(row);
  sheet.getRange(rowNumber, 17).setValue(new Date());
  SpreadsheetApp.flush();
}

function arenaSendConfirmation_(row) {
  const reference = String(row[1]);
  if (!/^SA26-[A-F0-9-]+$/.test(reference) || !arenaValidEmail_(row[6])) {
    throw new Error('Invalid confirmation recipient or reference.');
  }
  const subject = 'Je plek is bevestigd | The Sports Arena';
  const body = [
    'Bedankt voor je inschrijving! We hebben je betaling ontvangen en je plek is bevestigd.',
    '',
    'The Sports Arena | Crescent Youth vzw',
    'Zondag 29 november 2026, 13.00–16.30 uur',
    'Buurtcentrum Xaverianen, Xaverianenstraat 13/3, 8200 Sint-Michiels, Brugge',
    'Betaald: EUR ' + Number(row[12]).toFixed(2),
    'Inschrijvingsnummer: ' + reference,
    '',
    'We kijken ernaar uit je te zien!',
    'Crescent Youth vzw',
    '',
    'Dit is een automatisch bericht. Vragen? Mail naar info@crescentyouth.be.'
  ].join('\n');
  MailApp.sendEmail({
    to: row[6],
    subject: subject,
    body: body,
    htmlBody: '<div style="font:16px/1.6 Arial,sans-serif;color:#173126;max-width:560px;margin:auto">' +
      '<div style="background:#173126;color:#fff;padding:24px"><small>CRESCENT YOUTH VZW</small>' +
      '<h1 style="margin:8px 0 0">Je plek is bevestigd</h1></div>' +
      '<div style="background:#f7f4ef;padding:24px"><p>' + body.split('\n').join('<br>') +
      '</p></div></div>',
    name: 'Crescent Youth vzw',
    noReply: true
  });
}

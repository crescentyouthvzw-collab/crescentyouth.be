/**
 * The Social Arena — Google Apps Script receiver for the registration form.
 *
 * Paste into the dedicated event Apps Script project, then deploy as a
 * Web app running as the script owner. Keep the spreadsheet private.
 * This file is source code only; it is NOT deployed by GitHub Pages.
 */
const ARENA_SHEET_ID = '1SjF_CqadSiCJIPO7w9F5A4lpjoL6b73hxf8FBP5hGOA';
const ARENA_TAB = 'Sports Arena 2026';
const ARENA_EVENT_ID = 'the-sports-arena-2026';
const ARENA_EVENT_DATE = '2026-11-29';
const ARENA_MAX_REGISTRATIONS = 40;
const ARENA_DISPLAY_CAPACITY = 35;
const ARENA_GENDER_LIMITS = { Male: 24, Female: 16 };
const ARENA_LEGACY_GENDERS = { Brothers: 'Male', Sisters: 'Female' };

const ARENA_HEADERS = [
  'Created At', 'Registration ID', 'Event ID', 'Event Date',
  'First Name', 'Last Name', 'Email', 'Phone', 'Member',
  'Sports Section', 'Heard From', 'Consent', 'Price EUR',
  'Payment Status', 'Payment Notes', 'SumUp Checkout ID', 'Confirmation Sent At', 'Gender'
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
    sheet.getRange(1, 16, 1, ARENA_HEADERS.length - 15).setValues([ARENA_HEADERS.slice(15)])
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

// Compare Belgian local numbers, international numbers, and older Sheet values.
function arenaPhoneKey_(value) {
  const raw = String(value || '').trim().replace(/^'/, '');
  if (!/^\+?[\d ()./-]+$/.test(raw)) return '';
  let digits = raw.replace(/\D/g, '');
  const international = raw.startsWith('+') || digits.startsWith('00');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (international || /^32\d{8,10}$/.test(digits)) {
    digits = digits.replace(/^320(?=\d{8,9}$)/, '32');
  } else if (/^0?\d{8,9}$/.test(digits)) {
    digits = '32' + digits.replace(/^0/, '');
  }
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : '';
}

function arenaEmailKey_(value) {
  return String(value || '').trim().replace(/^'/, '').toLowerCase();
}

function arenaMembershipRows_() {
  const settings = PropertiesService.getScriptProperties();
  const manualId = settings.getProperty('ARENA_MANUAL_MEMBERS_SHEET_ID');
  const paidId = settings.getProperty('ARENA_PAID_MEMBERS_SHEET_ID');
  if (!manualId || !paidId) throw new Error('Membership spreadsheets are not configured.');

  const manual = SpreadsheetApp.openById(manualId).getSheetByName('Ledenlijst');
  const paid = SpreadsheetApp.openById(paidId).getSheetByName('Sheet1');
  if (!manual || !paid) throw new Error('Membership tabs are missing.');
  // The native copy keeps the original layout: F = name, G = phone, H = email.
  const rosterRows = manual.getRange(1, 6, manual.getLastRow(), 3).getDisplayValues();
  const paidRows = paid.getDataRange().getDisplayValues();
  if (!rosterRows.some(row => row.map(cell => cell.trim().toLowerCase()).join('|') ===
        'voornaam + naam|telefoon nummer|e-mail') ||
      paidRows[0].slice(3, 5).join('|') !== 'Email|Phone' ||
      paidRows[0][14] !== 'Payment Status') {
    throw new Error('Membership headers do not match.');
  }

  const approvedRows = rosterRows
    .filter(([name, phone, email]) => name.trim() &&
      (arenaValidEmail_(arenaEmailKey_(email)) || arenaPhoneKey_(phone)))
    .map(([, phone, email]) => [email, phone]);
  if (!approvedRows.length) throw new Error('No contacts found in the manual roster.');
  return approvedRows.concat(paidRows.slice(1)
    .filter(row => String(row[14]).trim().toLowerCase() === 'payment done')
    .map(row => row.slice(3, 5)));
}

function checkSportsArenaMembershipSetup() {
  const rows = arenaMembershipRows_();
  const usable = rows.filter(row => arenaValidEmail_(arenaEmailKey_(row[0])) || arenaPhoneKey_(row[1]));
  if (!usable.length) throw new Error('No usable membership records were found.');
  Logger.log('PASS: both membership sheets are readable. Usable roster rows: %s.', usable.length);
}

function arenaOpen_() {
  const settings = PropertiesService.getScriptProperties();
  return settings.getProperty('ARENA_REGISTRATION_OPEN') === 'true' &&
    Boolean(settings.getProperty('SUMUP_API_KEY') && settings.getProperty('SUMUP_MERCHANT_CODE') &&
      settings.getProperty('ARENA_MANUAL_MEMBERS_SHEET_ID') && settings.getProperty('ARENA_PAID_MEMBERS_SHEET_ID'));
}

function arenaRows_(sheet) {
  return sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, ARENA_HEADERS.length).getValues()
    : [];
}

function arenaActiveRows_(rows) {
  return rows.filter(row => row[2] === ARENA_EVENT_ID && row[13] !== 'Expired');
}

function arenaRemainingByGender_(active) {
  const remaining = { ...ARENA_GENDER_LIMITS };
  for (const row of active) {
    const gender = row[17] || ARENA_LEGACY_GENDERS[row[9]];
    // Keep unclassified registrations within both limits until their gender is recorded.
    if (gender !== 'Female') remaining.Male--;
    if (gender !== 'Male') remaining.Female--;
  }
  return remaining;
}

function arenaAvailablePlaces_(active) {
  const remaining = arenaRemainingByGender_(active);
  return Math.max(0, Math.min(ARENA_MAX_REGISTRATIONS - active.length,
    Math.max(0, remaining.Male) + Math.max(0, remaining.Female)));
}

function arenaCapacity_(rows) {
  const active = arenaActiveRows_(rows);
  const paid = active.filter(row => row[13] === 'Paid');
  const verified = paid.filter(row => row[14] === 'Verified by SumUp').length;
  return {
    capacity: ARENA_DISPLAY_CAPACITY,
    paidCount: Math.min(verified, ARENA_DISPLAY_CAPACITY),
    soldOut: arenaAvailablePlaces_(paid) === 0,
    availablePlaces: arenaAvailablePlaces_(active)
  };
}

function doGet() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('arena-capacity');
  const status = { registrationOpen: arenaOpen_(), membershipPricing: true };
  if (cached) return arenaResult_(Object.assign(status, JSON.parse(cached)));
  if (status.registrationOpen) checkSportsArenaPayments();
  const sheet = SpreadsheetApp.openById(ARENA_SHEET_ID).getSheetByName(ARENA_TAB);
  const capacity = arenaCapacity_(arenaRows_(sheet));
  cache.put('arena-capacity', JSON.stringify(capacity), 20);
  return arenaResult_(Object.assign(status, capacity));
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

  if (data?.membershipPricing !== true) {
    return arenaResult_({ success: false, code: 'refresh', message: 'Please reload the registration page.' });
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
  const email = arenaEmailKey_(data.email);
  const phone = arenaPhoneKey_(data.phone);
  const gender = data.gender || ARENA_LEGACY_GENDERS[data.sportsSection];
  const heardFrom = arenaSafeCell_(data.heardFrom, 150);

  if (!firstName || !lastName || !arenaValidEmail_(email) ||
      !phone ||
      !['Male', 'Female'].includes(gender)) {
    return arenaResult_({ success: false, code: 'invalid', message: 'Please check your details.' });
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const spreadsheet = SpreadsheetApp.openById(ARENA_SHEET_ID);
    const sheet = spreadsheet.getSheetByName(ARENA_TAB);
    if (!sheet) throw new Error('Run setupSportsArenaSheet first.');
    if (sheet.getLastRow() < 1) throw new Error('Registration headers are missing.');
    const rows = arenaRows_(sheet);
    if (!testOnly && arenaRemainingByGender_(arenaActiveRows_(rows))[gender] <= 0) {
      arenaRefreshPayments_(sheet, rows);
    }

    let current = rows.map((row, index) => ({ row, number: index + 2 }))
      .filter(({ row }) => row[2] === ARENA_EVENT_ID && row[13] !== 'Expired');
    const matches = current.filter(({ row }) =>
      arenaEmailKey_(row[6]) === email || arenaPhoneKey_(row[7]) === phone);
    if (matches.length) {
      const { row, number } = matches[0];
      if (testOnly || matches.length !== 1 || row[13] !== 'Pending SumUp payment' ||
          !row[15] || arenaEmailKey_(row[6]) !== email || arenaPhoneKey_(row[7]) !== phone) {
        return arenaDuplicate_();
      }

      const checkout = arenaVerifiedCheckout_(row);
      if (checkout.status === 'PAID') return arenaDuplicate_();
      if (checkout.status === 'EXPIRED') {
        sheet.getRange(number, 14).setValue('Expired');
        SpreadsheetApp.flush();
        current = current.filter(entry => entry.number !== number);
      } else {
        if (!['PENDING', 'FAILED'].includes(checkout.status) ||
            !arenaValidCheckoutUrl_(checkout.hosted_checkout_url)) {
          throw new Error('SumUp checkout cannot be resumed.');
        }
        if (row[17] !== gender) {
          const others = current.filter(entry => entry.number !== number).map(entry => entry.row);
          if (arenaRemainingByGender_(others)[gender] <= 0) return arenaGenderFull_();
          sheet.getRange(number, 18).setValue(gender);
          SpreadsheetApp.flush();
          CacheService.getScriptCache().remove('arena-capacity');
        }
        return arenaResult_({ success: true, registrationId: row[1], amount: row[12], paymentUrl: checkout.hosted_checkout_url });
      }
    }
    if (current.length >= ARENA_MAX_REGISTRATIONS) {
      return arenaResult_({ success: false, code: 'full', message: 'Er zijn momenteel geen plaatsen vrij. Probeer later opnieuw als een betaling niet wordt afgerond.' });
    }

    if (arenaRemainingByGender_(current.map(entry => entry.row))[gender] <= 0) return arenaGenderFull_();

    const eligible = !testOnly && arenaMembershipRows_().some(row =>
      arenaEmailKey_(row[0]) === email || arenaPhoneKey_(row[1]) === phone
    );
    const member = eligible ? 'Yes' : 'No';
    const fee = eligible ? 8 : 10;
    const registrationId = 'SA26-' + Utilities.getUuid().toUpperCase();
    const checkout = testOnly ? null : arenaCreateCheckout_(registrationId, fee);
    sheet.appendRow([
      new Date(), registrationId, ARENA_EVENT_ID, ARENA_EVENT_DATE,
      firstName, lastName, arenaSafeCell_(email, 150), arenaSafeCell_('+' + phone, 30), member,
      '', heardFrom, 'Yes', fee, 'Pending SumUp payment', '', checkout ? checkout.id : '', '', gender
    ]);
    SpreadsheetApp.flush();
    CacheService.getScriptCache().remove('arena-capacity');
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
    gender: 'Male',
    heardFrom: 'Internal registration test',
    consent: true,
    website: ''
  }, true).getContent());

  if (!result.success || result.amount !== 10 || !result.registrationId) {
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
        saved[12] !== 10 ||
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

function arenaGenderFull_() {
  return arenaResult_({ success: false, code: 'gender_full', message: 'No places currently available for the selected group.' });
}

function arenaDuplicate_() {
  return arenaResult_({ success: false, code: 'duplicate', message: 'Email or phone already registered.' });
}

function arenaValidCheckoutUrl_(url) {
  return /^https:\/\/checkout\.sumup\.com\/pay\/[a-z0-9-]+$/i.test(url);
}

function arenaCreateCheckout_(reference, amount) {
  const merchantCode = PropertiesService.getScriptProperties().getProperty('SUMUP_MERCHANT_CODE');
  const checkout = arenaSumUp_('', {
    checkout_reference: reference,
    merchant_code: merchantCode,
    amount: amount,
    currency: 'EUR',
    description: 'Crescent Youth - The Social Arena',
    valid_until: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    hosted_checkout: { enabled: true },
    redirect_url: 'https://crescentyouth.be/Events/sports-arena.html#registration'
  });
  if (!checkout.id || !arenaValidCheckoutUrl_(checkout.hosted_checkout_url)) {
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
    arenaRefreshPayments_(sheet, arenaRows_(sheet));
    CacheService.getScriptCache().remove('arena-capacity');
  } finally {
    SpreadsheetApp.flush();
    lock.releaseLock();
  }
}

function arenaRefreshPayments_(sheet, rows) {
  rows.forEach((row, index) => {
    if (row[2] !== ARENA_EVENT_ID || !row[15] || row[16] || row[13] === 'Expired') return;
    try {
      arenaReconcilePayment_(sheet, index + 2, row);
    } catch (err) {
      console.error('Reconciliation failed for ' + row[1] + ': ' + err.message);
    }
  });
}

function arenaVerifiedCheckout_(row) {
  const checkout = arenaSumUp_('/' + encodeURIComponent(row[15]));
  const merchant = PropertiesService.getScriptProperties().getProperty('SUMUP_MERCHANT_CODE');
  if (checkout.id !== row[15] || checkout.checkout_reference !== row[1] ||
      checkout.merchant_code !== merchant || checkout.currency !== 'EUR' ||
      Number(checkout.amount) !== Number(row[12])) {
    throw new Error('Checkout details do not match the registration.');
  }
  return checkout;
}

function arenaReconcilePayment_(sheet, rowNumber, row) {
  const checkout = arenaVerifiedCheckout_(row);
  if (checkout.status === 'EXPIRED' && row[13] === 'Pending SumUp payment') {
    sheet.getRange(rowNumber, 14).setValue('Expired');
    row[13] = 'Expired';
  }
  if (checkout.status !== 'PAID') return;

  sheet.getRange(rowNumber, 14, 1, 2).setValues([['Paid', 'Verified by SumUp']]);
  row[13] = 'Paid';
  row[14] = 'Verified by SumUp';
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
  const subject = 'Je inschrijving is bevestigd | The Social Arena';
  const date = 'Zondag 29 november 2026';
  const time = '12:30–16:30 uur';
  const venue = 'Buurtcentrum Xaverianen';
  const address = 'Xaverianenstraat 13/3, 8200 Sint-Michiels, Brugge';
  const amount = '€ ' + Number(row[12]).toFixed(2).replace('.', ',');
  const contact = 'info@crescentyouth.be';
  const intro = 'We hebben je betaling ontvangen. Je inschrijving voor The Social Arena is definitief bevestigd.';
  const body = [
    intro, '',
    date + ' · ' + time, venue, address, '',
    'Betaald bedrag: ' + amount,
    'Inschrijvingsnummer: ' + reference, '',
    'Tot in Brugge!',
    'Crescent Youth vzw', '',
    'Dit is een automatisch bericht. Vragen? Mail naar ' + contact + '.'
  ].join('\n');

  const htmlBody = `
    <div lang="nl" style="background-color:#edf2ee;padding:16px 8px;font-family:Arial,sans-serif">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:560px;background-color:#ffffff;color:#173126;border:1px solid #dbe6dd">
        <tr><td bgcolor="#173126" style="padding:26px 24px;border-top:4px solid #cfb26b;color:#ffffff">
          <p style="margin:0 0 12px;color:#f0d99e;font-size:12px;letter-spacing:1px;font-weight:bold">CRESCENT YOUTH VZW</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff">The Social Arena</h1>
          <p style="margin:10px 0 0;font-size:16px;color:#e5f2e9">Je inschrijving is bevestigd</p>
        </td></tr>
        <tr><td style="padding:24px;font-size:16px;line-height:1.55">
          <p style="margin:0 0 20px">${intro}</p>
          <h2 style="margin:0 0 10px;font-size:18px">Praktische informatie</h2>
          <p style="margin:0 0 14px"><strong>${date}</strong><br>${time}</p>
          <p style="margin:0 0 22px"><strong>${venue}</strong><br>${address}</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr><td bgcolor="#edf5ef" style="padding:16px;color:#173126;border:1px solid #dbe6dd">
              <p style="margin:0 0 10px"><strong>Betaald bedrag</strong><br>${amount}</p>
              <p style="margin:0;overflow-wrap:anywhere;word-break:break-word"><strong>Inschrijvingsnummer</strong><br>${reference}</p>
            </td></tr>
          </table>
          <p style="margin:20px 0 0">Tot in Brugge!<br><strong>Crescent Youth vzw</strong></p>
        </td></tr>
        <tr><td bgcolor="#f4f7f4" style="padding:16px 24px;color:#30483a;border-top:1px solid #dbe6dd;font-size:14px;line-height:1.5">
          Dit is een automatisch bericht.<br>Vragen? Mail naar <a href="mailto:${contact}" style="color:#205b3d;text-decoration:underline">${contact}</a>.
        </td></tr>
      </table>
    </div>`;
  MailApp.sendEmail({
    to: row[6],
    subject: subject,
    body: body,
    htmlBody: htmlBody,
    name: 'Crescent Youth vzw',
    noReply: true
  });
}

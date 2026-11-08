/*
 * THE SPORTS ARENA — registration launch controls.
 *
 * Leave registrationOpen false until the venue is confirmed, the Apps Script
 * receiver is deployed and tested, and BOTH SumUp payment links exist.
 * Do not put Google credentials, API keys, or private attendee data here.
 */
window.SPORTS_ARENA_CONFIG = Object.freeze({
    registrationOpen: false,
    googleScriptUrl: '',
    sumupMemberUrl: 'https://pay.sumup.com/b2c/QAEK6E05',       // €8 members
    sumupNonMemberUrl: 'https://pay.sumup.com/b2c/QFMILULQ'     // €10 non-members
});

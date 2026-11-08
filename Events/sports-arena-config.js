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
    sumupMemberUrl: '',       // SumUp payment link charging exactly €8
    sumupNonMemberUrl: ''     // SumUp payment link charging exactly €10
});

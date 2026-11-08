/*
 * THE SPORTS ARENA — registration launch controls.
 *
 * Leave registrationOpen false until the venue is confirmed, the Apps Script
 * receiver is deployed and tested, and BOTH SumUp payment links exist.
 * Do not put Google credentials, API keys, or private attendee data here.
 */
window.SPORTS_ARENA_CONFIG = Object.freeze({
    registrationOpen: false,
    googleScriptUrl: 'https://script.google.com/a/macros/crescentyouth.be/s/AKfycby6HIGE_O9C7W0U1MbvX9uUOlZ2MsPzLa9BGLiYslSlvXUz-pi164i1ckaC7x9lIy25WQ/exec',
    sumupMemberUrl: 'https://pay.sumup.com/b2c/QAEK6E05',       // €8 members
    sumupNonMemberUrl: 'https://pay.sumup.com/b2c/QFMILULQ'     // €10 non-members
});

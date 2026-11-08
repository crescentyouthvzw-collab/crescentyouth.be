/*
 * THE SPORTS ARENA — registration launch controls.
 *
 * Leave registrationOpen false until the deployed Apps Script receiver has
 * passed a real browser-to-Sheets test and organisers approve opening.
 * Do not put Google credentials, API keys, or private attendee data here.
 */
window.SPORTS_ARENA_CONFIG = Object.freeze({
    registrationOpen: false,
    googleScriptUrl: 'https://script.google.com/macros/s/AKfycby6HIGE_O9C7W0U1MbvX9uUOlZ2MsPzLa9BGLiYslSlvXUz-pi164i1ckaC7x9lIy25WQ/exec',
    sumupMemberUrl: 'https://pay.sumup.com/b2c/QAEK6E05',       // €8 members
    sumupNonMemberUrl: 'https://pay.sumup.com/b2c/QFMILULQ'     // €10 non-members
});

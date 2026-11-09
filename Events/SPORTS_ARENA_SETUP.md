# The Sports Arena registration

The website uses its existing form and the dedicated Crescent Youth Apps Script deployment. The receiver writes to the private [Sports Arena registration sheet](https://docs.google.com/spreadsheets/d/1SjF_CqadSiCJIPO7w9F5A4lpjoL6b73hxf8FBP5hGOA/edit?gid=1159388902#gid=1159388902). The tab name is **Sports Arena 2026**.

## Prepare the production receiver

1. Under the Crescent Youth Google Workspace account, open the [dedicated Apps Script project](https://script.google.com/u/0/home/projects/1epxBBnnsfLVnW51LzjRNiRAIRD3c8D9lcQM5KRlzmT6INCpBk60f7TIc/edit). Replace the starter myFunction in Code.gs with the full contents of sports-arena-apps-script.gs and save.
2. Run setupSportsArenaSheet and approve permissions. It preserves the first 15 columns and adds **SumUp Checkout ID** and **Confirmation Sent At**. Run testSportsArenaRegistration while closed to verify writing and cleaning up a dummy row.
3. In **Project Settings → Script properties**, add **SUMUP_API_KEY** and **SUMUP_MERCHANT_CODE**. Paste the key only there. Keep project editor access restricted. Leave **ARENA_REGISTRATION_OPEN** absent or set it to **false** until ready.
4. Run installSportsArenaPaymentCheck and approve permissions. Install it once as the Workspace account that will send the automatic no-reply mail.
5. In the new project, choose **Deploy → New deployment → Web app**. Set **Execute as** to **Me** and **Who has access** to **Anyone**. Copy the resulting URL ending in /exec and use it as googleScriptUrl in sports-arena-config.js. The project editor link cannot receive registrations. A site publish and an Apps Script deployment are separate.

## Verify before opening

Use a separate Apps Script project, spreadsheet and SumUp sandbox merchant so the public site can stay closed throughout testing. Set the test script's sheet ID to the private test sheet, set the three script properties using sandbox credentials and set the registration flag to true only in the test project. Point a local copy of the site at its /exec URL. Run the sheet setup and install the payment check there.

- In a private browser window, submit one member registration and one non-member registration using inboxes you control. Confirm the hosted checkout shows EUR 8 and EUR 10 respectively. Verify both rows show **Pending SumUp payment** and neither inbox has a confirmation.
- Complete a successful payment using a [SumUp sandbox test card](https://developer.sumup.com/online-payments/testing/). Confirm that only the matching row shows **Paid**, that the email arrives with the correct event details and reference, and that **Confirmation Sent At** is filled. Run checkSportsArenaPayments again and verify there is no second email.
- Check a declined or abandoned checkout. Confirm there is no confirmation email. Once SumUp reports **EXPIRED**, the reserved place is released. Verify duplicate email handling and the 35-place limit in the test sheet.

After verification, confirm the venue can accommodate 35 participants, publish the website, then set **ARENA_REGISTRATION_OPEN** to **true** in the production script properties. Check the production form in a private browser window. The calendar links to the event details. The form itself reads the current registration status from Apps Script.

## Payment reconciliation

The server assigns the fee and creates one SumUp Hosted Checkout per registration. A five-minute Apps Script trigger reads checkout status directly from SumUp. It matches the checkout ID, registration reference, merchant, currency and amount before recording a verified payment or attempting an email. Existing rows without a checkout ID require manual reconciliation.

An email failure leaves **Confirmation Sent At** blank so the trigger can try again. If mail was delivered but Apps Script was interrupted before saving the timestamp, a later run can send it again. Review Apps Script executions if a paid row remains without a timestamp.

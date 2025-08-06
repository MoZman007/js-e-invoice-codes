# Electronic Address Scheme (EAS) for JavaScript / TypeScript

[![npm version](https://badge.fury.io/js/electronic-address-scheme.svg)](https://badge.fury.io/js/electronic-address-scheme)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JavaScript package for the Electronic Address Scheme (EAS) code lists used in European e-invoicing.

## About the Electronic Address Scheme (EAS)

The **Electronic Address Scheme (EAS)** is a code list used within the European e-invoicing standard **EN 16931** to specify the type of an electronic address identifier. When an electronic invoice is sent, it includes an address for the buyer and seller. The EAS code clarifies what kind of address is being provided, for example, a Global Location Number (GLN), a VAT number, or a national routing identifier like the German Leitweg-ID.

This ensures that different systems can correctly interpret the address for routing and processing. The code list is maintained by the European Commission (formerly through the Connecting Europe Facility, CEF) and is essential for standards like **XRechnung**, **ZUGFeRD**, and networks like **Peppol**.

This package provides the official EAS code lists in a simple, accessible format for use in JavaScript and TypeScript applications.

## RechnungsAPI

If you are looking for an API solution to generate German e-invoice documents, consider checking out [RechnungsAPI](https://www.rechnungs-api.de), without which this package would not exist.

## Installation

Install the package using your favorite package manager:

```bash
npm install electronic-address-scheme
```

or

```bash
yarn add electronic-address-scheme
```

## Usage

You can import the latest version of the code list or a specific historical version to match your compliance needs.

### Importing the Latest Code List

The main export of the package provides all versions of the EAS code list.

```javascript
import { EAS } from 'electronic-address-scheme';
// Or to just get the latest version:
import { EAS } from 'electronic-address-scheme/latest';

console.log('Latest EAS Codes:', EAS);
// [
//   {
//   	code: "0002",
//   	name: "System Information et Repertoire des Entreprise et des Etablissements: SIRENE",
//   },
//   { code: "0007", name: "Organisationsnummer" },
//   { code: "0009", name: "SIRET-CODE" },
//   ...
// ]
```

### Importing a Specific Version

For specific use cases or to align with older specifications, you can deep-import a particular version of the code list. The package is configured to allow this to help optimize your application's bundle size.

```javascript
// For example, to get version 3 of the list
import { EAS_3 } from 'electronic-address-scheme/3';

console.log('EAS Version 3:', EAS_3);
```

### Data Structure

Each code list is an array of objects, where each object conforms to the `CodeListEntry` type.

```typescript
export interface CodeListEntry {
	code: string;
	name?: string;
	description?: string;
}

export type CodeList = CodeListEntry[];
```

## Available Code Lists

This package contains multiple versions of the Electronic Address Scheme (EAS) code list. You can import them as needed:

*   **Version 1**
*   **Version 2**
*   **Version 3**
*   **Version 4**
*   **Version 5** (Latest)


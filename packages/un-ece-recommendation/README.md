# UN/ECE Recommendation N°20 and N°21 code lists for JavaScript / TypeScript

[![npm version](https://badge.fury.io/js/un-ece-recommendation.svg)](https://badge.fury.io/js/un-ece-recommendation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JavaScript package for the United Nations Economic Commission for Europe (UN/ECE) Recommendation N°20 and N°21 code lists.

## About UN/ECE Recommendations

The **United Nations Economic Commission for Europe (UN/ECE)** develops a series of trade facilitation recommendations to simplify and harmonize international trade procedures. Among these are:

*   **Recommendation N°20 (Rec. 20):** Codes for Units of Measure Used in International Trade.
*   **Recommendation N°21 (Rec. 21):** Codes for Passengers, Types of Cargo, Packages and Packaging Materials.

These code lists are essential in e-invoicing standards like **EN16931**, **ZUGFeRD**, and **XRechnung** to ensure a common understanding of units of measure and package types. This package provides the official UN/ECE code lists in a developer-friendly format for use in JavaScript and TypeScript applications.

## RechnungsAPI

If you are looking for an API solution to generate German e-invoice documents, consider checking out [RechnungsAPI](https://www.rechnungs-api.de), without which this package would not exist.

## Installation

Install the package using your favorite package manager:

```bash
npm install un-ece-recommendation
```

or

```bash
yarn add un-ece-recommendation
```

## Usage

You have the flexibility to either import the entire collection of code lists or import a specific code list individually, which can help in reducing the final bundle size of your application.

### Importing All Code Lists

All available code lists are exported as named objects from the main package entry point.

```javascript
import { REC_20_2, REC_21_3 } from 'un-ece-recommendation';

console.log('Recommendation N°20 Codes:', REC_20_2);
// [
//   { code: "05", name: "lift" },
//   { code: "06", name: "small spray" },
//   { code: "08", name: "heat lot" },
//   ...
// ]

console.log('Recommendation N°21 Codes:', REC_21_3);
// [
//   { code: "X1A", name: "Drum, steel" },
//   { code: "X1B", name: "Drum, aluminium" },
//   { code: "X1D", name: "Drum, plywood" },
//   ...
// ]
```

### Importing a Specific Code List

For a more optimized approach, you can deep-import a single code list directly.

```javascript
import { REC_20_1 } from 'un-ece-recommendation/20/1';

console.log(REC_20_1);
// [
//   { code: "10", name: "group" },
//   { code: "11", name: "outfit" },
//   { code: "13", name: "ration" },
//   ...
// ]
```

### Data Structure

Each code list is provided as an array of objects, where each object adheres to the `CodeListEntry` type.

```typescript
export interface CodeListEntry {
	code: string;
	name?: string;
	description?: string;
}

export type CodeList = CodeListEntry[];
```


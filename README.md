# untdid

[![npm version](https://badge.fury.io/js/untdid.svg)](https://badge.fury.io/js/untdid)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JavaScript package for the United Nations Trade Data Interchange Directory (UNTDID) code lists.

## About UNTDID

The **United Nations Trade Data Interchange Directory (UNTDID)** is a set of internationally agreed-upon standards for the electronic interchange of structured data. These directories are maintained by the UNECE and are a part of the UN/EDIFACT standard.

In the context of e-invoicing standards like **EN16931**, **ZUGFeRD**, and **XRechnung**, UNTDID provides standardized code lists for various data elements to ensure interoperability. For example, specific codes are used to identify document types, payment means, tax categories, and more. This package provides these official code lists in a simple, accessible JSON format for use in JavaScript and TypeScript applications.

The source for these code lists is [XRepository](https://www.xrepository.de/).

## Installation

Install the package using your favorite package manager:

```bash
npm install untdid
```

or

```bash
yarn add untdid
```

## Usage

You can import the entire collection of code lists or import a specific code list individually to reduce your bundle size.

### Importing All Code Lists

All available code lists are exported as named objects from the main package entry point.

```javascript
import { UNTDID_1001_1, UNTDID_5305_2 } from 'untdid';

console.log('Document name codes:', UNTDID_1001_1);
// [
//   {
//   	code: "1",
//   	name: "Certificate of analysis",
//   	description: "Certificate providing the values of an analysis.",
//   },
//   {
//   	code: "2",
//   	name: "Certificate of conformity",
//   	description:
//   		"Certificate certifying the conformity to predefined definitions.",
//   },
//   ...
// ]

console.log('Tax category codes:', UNTDID_5305_3);
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

### Importing a Specific Code List

For a more optimized approach, you can deep-import a single code list. The package `exports` are configured to allow this.

```javascript
import { UNTDID_7143_1 } from 'untdid/7143/1';

console.log(UNTDID_7143_1);
// [
//   {
//   	code: "AA",
//   	name: "Product version number",
//   	description:
//   		"Number assigned by manufacturer or seller to identify the release of a product.",
//   },
//   {
//   	code: "AB",
//   	name: "Assembly",
//   	description: "The item number is that of an assembly.",
//   },
//   ...
// ]
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

This package includes the following UNTDID code lists, which are commonly used in e-invoicing:

*   **1001**: Document name code
*   **1153**: Reference code qualifier
*   **2005**: Date or time or period function code qualifier
*   **4451**: Text subject code qualifier
*   **4461**: Payment means code
*   **5189**: Allowance or charge identification code
*   **5305**: Duty or tax or fee category code
*   **7143**: Item type identification code
*   **7161**: Special service description code

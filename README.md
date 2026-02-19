# Medical Claim Review Dashboard

A side-by-side medical claim review tool built with React and Vite. Auditors can inspect a scanned PDF claim document on the left while reviewing the extracted & analyzed data on the right.

## Features

- **PDF Viewer** — Navigate pages and zoom in/out to inspect the original claim document
- **Claim Summary** — High-level view of claimed vs. actual billed amounts, with discrepancy alerts
- **Patient Details** — Patient demographics and hospitalization info
- **Bills & NME Analysis** — Line-item breakdown of each invoice, flagging Non-Medical Expenses (NME) with deduction reasons
- **Audit Issues** — Medical legibility checks, policy violations, and ICD-10 diagnostic codes
- **Document Map** — Segment index showing which document type is on which page, with one-click PDF navigation

## Getting Started

```bash
npm install
npm run dev
```

Place your PDF at `public/final.pdf` and your claim data at `public/data.json`.

## Tech Stack

- React (Vite)
- Tailwind CSS 4
- react-pdf

## Assignment Context

This project was built as part of a frontend evaluation assignment. The focus was on clean React structure, handling nested JSON data, and building a clear, reviewer-friendly UI rather than adding unnecessary complexity.

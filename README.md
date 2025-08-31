# SignPDF

A full-stack application for securely signing PDF documents using a digital certificate. Built with React, TypeScript, Vite, Express, and pdf-lib.

## Features

- Upload PDF files via a modern React UI
- Securely sign PDFs on the backend using a `.p12` certificate
- Download signed PDFs
- Preview signed PDFs in-browser
- Stylish UI with Tailwind CSS

## Project Structure

```
├── src/                # React frontend
│   ├── components/     # UI components
│   ├── constants/      # Shared constants and types
│   ├── createPDF/      # PDF preview component
│   ├── assets/         # SVGs and images
│   ├── App.tsx         # Main app
│   └── main.tsx        # Entry point
├── server/             # Express backend
│   ├── index.js        # API for signing PDFs
│   └── certificate.p12 # Your signing certificate
├── public/             # Static assets
├── test/               # Jest setup and mocks
├── package.json        # Project scripts and dependencies
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── tsconfig*.json      # TypeScript configs
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A valid `.p12` certificate placed in `server/certificate.p12`

### Install Dependencies

```sh
npm install
```

### Run the Development Servers

Start the backend server:

```sh
npm run server:dev
```

Start the frontend (React/Vite):

```sh
npm run dev
```

The frontend will proxy API requests to the backend (`/api/sign`).

### Build for Production

```sh
npm run build
```

## Usage

1. Open the app in your browser (`http://localhost:5173` by default).
2. Upload a PDF file.
3. Click "Sign Document Securely".
4. Download or preview the signed PDF.

## Configuration

- The backend listens on port `4000` by default.
- The frontend proxies `/api` requests to the backend (see [`vite.config.ts`](vite.config.ts)).
- Update certificate details in [`server/index.js`](server/index.js) as needed.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Express, pdf-lib, @signpdf/signpdf, multer

## License

MIT

---

**Note:** Never share your `.p12` certificate publicly.

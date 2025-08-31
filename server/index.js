import express from "express";
import multer from "multer";
import { PDFDocument } from "pdf-lib";
import { pdflibAddPlaceholder } from "@signpdf/placeholder-pdf-lib";
import signpdf from "@signpdf/signpdf";
import { P12Signer } from "@signpdf/signer-p12";
import fs from "fs";
import path from "path";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Load your .p12 certificate
const certificatePath = path.join(__dirname, "certificate.p12");
const certificateBuffer = fs.readFileSync(certificatePath);
const signer = new P12Signer(certificateBuffer);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/sign", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Load PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(req.file.buffer);

    // Add a signature placeholder
    pdflibAddPlaceholder({
      pdfDoc,
      reason: "Signed via Express API",
      contactInfo: "example@example.com",
      name: "John Doe",
      location: "Online",
      page: 0,
      width: 200,
      height: 50,
      x: 50,
      y: 50,
    });

    // Save PDF with placeholder
    const pdfWithPlaceholderBytes = await pdfDoc.save();

    // Sign the PDF
    const signedPdf = signpdf.sign(pdfWithPlaceholderBytes, signer);

    // Return signed PDF
    res.setHeader("Content-Type", "application/pdf");
    res.send(signedPdf);
  } catch (err) {
    console.error("Error in /api/sign:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

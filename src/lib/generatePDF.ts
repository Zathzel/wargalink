"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generates a real PDF from the element with id="surat-cetak"
 * and opens it in a new browser tab as a native PDF popup.
 */
export async function generateAndOpenPDF(filename: string = "Surat-WargaLink.pdf"): Promise<void> {
  const element = document.getElementById("surat-cetak");
  if (!element) throw new Error("Element #surat-cetak tidak ditemukan.");

  // Capture the element as a high-res canvas
  const canvas = await html2canvas(element, {
    scale: 3,           // 3x resolution → crisp print quality
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  // A4 dimensions in mm
  const A4_W = 210;
  const A4_H = 297;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Fit the image into the A4 page exactly
  pdf.addImage(imgData, "JPEG", 0, 0, A4_W, A4_H);

  // Create a Blob URL and open in new tab → browser shows native PDF viewer
  const pdfBlob = pdf.output("blob");
  const blobUrl = URL.createObjectURL(pdfBlob);
  window.open(blobUrl, "_blank");
}

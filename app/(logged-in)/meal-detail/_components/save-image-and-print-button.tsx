"use client";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { FiDownload, FiPrinter } from "react-icons/fi";

interface ButtonProps {
  targetId: string;
}

const captureElement = async (targetId: string) => {
  const target = document.getElementById(targetId);
  if (!target) {
    console.error(`Element with id "${targetId}" not found`);
    return null;
  }

  // Store original styles
  const originalStyles = {
    width: target.style.width,
    height: target.style.height,
    position: target.style.position,
    overflow: target.style.overflow,
    left: target.style.left,
  };

  // Apply temporary styles for capturing
  Object.assign(target.style, {
    width: "auto",
    height: "auto",
    position: "absolute",
    overflow: "visible",
    left: "0",
  });

  // Apply specific styles to child elements
  const topDiv = target.querySelector(".need-remove-border");
  topDiv?.classList.add("border-none");

  const switchEl = target.querySelector(".need-hide");
  switchEl?.classList.add("hidden")

  const borders = target.querySelectorAll(".need-border");
  borders.forEach((border) => border.classList.add("border"));

  const spans = target.querySelectorAll("span");
  spans.forEach((span) => {
    span.style.position = "relative";
    span.style.top = "-8px";
  });

  // Capture the element
  const canvas = await html2canvas(target, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    scrollY: -window.scrollY,
  });

  // Restore original styles
  Object.assign(target.style, originalStyles);
  topDiv?.classList.remove("border-none");
  switchEl?.classList.remove("hidden");
  borders.forEach((border) => border.classList.remove("border"));
  spans.forEach((span) => {
    span.style.position = "";
    span.style.top = "";
  });

  return canvas;
};

export const SaveAsImageButton: React.FC<ButtonProps> = ({ targetId }) => {
  const handleSaveAsImage = async () => {
    const canvas = await captureElement(targetId);
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "meal-plan.png";
      link.click();
    }
  };

  return (
    <Button
      onClick={handleSaveAsImage}
      className="mr-2 bg-white border border-slate-800 text-slate-800 hover:bg-slate-100 hover:border-slate-400"
    >
      <FiDownload className="mr-2 h-4 w-4" /> 이미지로 저장
    </Button>
  );
};

export const PrintButton: React.FC<ButtonProps> = ({ targetId }) => {
  const handlePrint = async () => {
    const canvas = await captureElement(targetId);
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width / 2;
      const imgHeight = canvas.height / 2;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.autoPrint();
      window.open(pdf.output("bloburl"), "_blank");
    }
  };

  return (
    <Button onClick={handlePrint} className="bg-slate-800 hover:bg-slate-600">
      <FiPrinter className="mr-2 h-4 w-4" /> 프린트
    </Button>
  );
};

import React from "react";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

// Rimuove i tag <a> (mantenendo il testo) per evitare anchor annidati quando
// l'heading viene renderizzato dentro un <Link>: HTML non valido che spezza
// il link esterno (i tap non funzionano, soprattutto su mobile).
const stripAnchors = (html = "") =>
  html.replace(/<a\b[^>]*>/gi, "").replace(/<\/a>/gi, "");

export const Heading = ({ level = 2, content, className = "", style = {}, stripLinks = false }) => {
  const html = relativeToAbsoluteUrls(content);
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: stripLinks ? stripAnchors(html) : html },
    className: className,
    style: style,
  });
  return tag;
};

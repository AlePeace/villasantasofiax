import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

// Vedi Heading: rimuove i tag <a> (mantenendo il testo) per evitare anchor
// annidati quando il paragrafo è dentro un <Link>.
const stripAnchors = (html = "") =>
  html.replace(/<a\b[^>]*>/gi, "").replace(/<\/a>/gi, "");

export const Paragraph = ({ content, className = "", stripLinks = false }) => {
  const html = relativeToAbsoluteUrls(content);
  return (
    <p
      dangerouslySetInnerHTML={{ __html: stripLinks ? stripAnchors(html) : html }}
      className={className}
    ></p>
  );
};

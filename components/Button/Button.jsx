import Link from "next/link";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Button = ({ url, content, className = "", target }) => {
  return (
    <Link
      href={relativeToAbsoluteUrls(url)}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`inline-block px-6 py-3 transition-all duration-300 ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
      />
  );
};

import React from "react";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Heading = ({ level = 2, content, className = "", style = {} }) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: relativeToAbsoluteUrls(content) },
    className: className,
    style: style,
  });
  return tag;
};

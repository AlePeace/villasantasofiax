import Link from "next/link";
import React from "react";

export const MainMenu = ({ menuData }) => {
  const nodes = Array.isArray(menuData)
    ? (menuData[0]?.menuItems?.nodes ?? [])
    : (menuData?.menuItems?.nodes ?? []);

  return (
    <nav className="fixed top-0 left-0 z-[9996]">
      <ul>
        {nodes.map((item, idx) => (
          <li key={item.uri ?? idx}>
            <Link href={item.uri}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

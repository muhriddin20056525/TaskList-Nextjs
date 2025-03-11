import React, { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-100">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

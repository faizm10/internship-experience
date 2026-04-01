import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Case File: My Co-op Journey",
  description: "An interactive investigation-board presentation of my internship experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Co-op Journey",
  description: "An interactive internship experience presentation",
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

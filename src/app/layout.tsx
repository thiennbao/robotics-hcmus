import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Import Montserrat from next/font/google
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "700"], // Choose the weights you need
  subsets: ["latin"], // Choose the subsets you need
});

export const metadata: Metadata = {
  title: "Robotics & IoT HCMUS",
  description:
    "Website cho Câu lạc bộ Robotics and IoT (Internet of Things) Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

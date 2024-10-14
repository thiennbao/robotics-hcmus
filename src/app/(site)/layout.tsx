import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import db from "@/lib/db";
import React from "react";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contacts = await db.contact.findMany();

  return (
    <>
      <Header />
      {children}
      <Footer contacts={contacts} />
    </>
  );
}

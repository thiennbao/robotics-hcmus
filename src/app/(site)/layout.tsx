import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import db from "@/lib/db";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigations = await db.navigation.findMany();
  const contacts = await db.contact.findMany();

  return (
    <>
      <Header extraNav={navigations} />
      {children}
      <Footer extraNav={navigations} contacts={contacts} />
    </>
  );
}

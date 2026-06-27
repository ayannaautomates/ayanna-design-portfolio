import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[3] flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}

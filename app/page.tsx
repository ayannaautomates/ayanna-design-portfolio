import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import BookCallCta from "@/components/BookCallCta";
import ContactForm from "@/components/ContactForm";
import { getFormSubmitAction } from "@/lib/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative z-[3] min-w-0 overflow-x-clip">
        <Hero />
        <About />
        <Projects />
        <BookCallCta />
        <ContactForm formsubmitAction={getFormSubmitAction()} />
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LPVideo from "@/components/LPVideo";
import ThePain from "@/components/ThePain";
import TheSolution from "@/components/TheSolution";
import Plans from "@/components/Plans";
import Support from "@/components/Support";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LPVideo />
        <ThePain />
        <TheSolution />
        <Plans />
        <Support />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

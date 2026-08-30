import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuickFacts from "@/components/QuickFacts";
import QuestTrail from "@/components/QuestTrail";
import Prizes from "@/components/Prizes";
import Schedule from "@/components/Schedule";
import Rules from "@/components/Rules";
import RegisterBand from "@/components/RegisterBand";
import Organizers from "@/components/Organizers";
import GameTeaser from "@/components/GameTeaser";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuickFacts />
      <QuestTrail />
      <Prizes />
      <Schedule />
      <Rules />
      <RegisterBand />
      <Organizers />
      <GameTeaser />
      <Footer />
    </main>
  );
}

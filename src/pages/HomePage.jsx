import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Comparison } from "../components/Comparison";
import { CallToAction } from "../components/CallToAction";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Comparison />
      <CallToAction />
    </div>
  );
}

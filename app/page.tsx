import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { GitGraph } from "@/components/git-graph";
import { Philosophy } from "@/components/philosophy";
import { Works } from "@/components/works";
import { Marquee } from "@/components/marquee";
import { Timeline } from "@/components/timeline";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <GitGraph />
      <Philosophy />
      <Works />
      <Marquee />
      <Timeline />
      <Footer />
    </main>
  );
}

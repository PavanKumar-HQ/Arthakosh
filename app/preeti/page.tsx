"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Chapter1_TheSeed } from "@/components/preeti/cinematic/Chapter1_TheSeed";
import { Chapter2_Roots } from "@/components/preeti/cinematic/Chapter2_Roots";
import { Chapter3_Paths } from "@/components/preeti/cinematic/Chapter3_Paths";
import { Chapter4_Butterflies } from "@/components/preeti/cinematic/Chapter4_Butterflies";
import { Chapter5_Field } from "@/components/preeti/cinematic/Chapter5_Field";
import { Chapter6_Fountain } from "@/components/preeti/cinematic/Chapter6_Fountain";
import { Chapter8_Seasons as Chapter7_Seasons } from "@/components/preeti/cinematic/Chapter8_Seasons";
import { Chapter9_Greenhouse as Chapter8_Greenhouse } from "@/components/preeti/cinematic/Chapter9_Greenhouse";
import { Chapter10_GoldenFlower as Chapter9_GoldenFlower } from "@/components/preeti/cinematic/Chapter10_GoldenFlower";
import { Chapter_Apology as Chapter10_Apology } from "@/components/preeti/cinematic/Chapter_Apology";
import { Finale_Tree as Chapter11_Finale } from "@/components/preeti/cinematic/Finale_Tree";

// Client-only: avoids SSR hydration mismatch
const GardenAmbient = dynamic(
  () => import("@/components/preeti/generative/GardenAmbient").then(m => ({ default: m.GardenAmbient })),
  { ssr: false }
);

export default function PreetiGardenOfGrowth() {
  const [activeChapter, setActiveChapter] = useState(1);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-chapter"));
            if (index) setActiveChapter(index);
          }
        });
      },
      { threshold: 0.5 } // When 50% of the section is visible
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToNext = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex <= 11 && sectionRefs.current[nextIndex - 1]) {
      sectionRefs.current[nextIndex - 1]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <main className="w-screen h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative font-sans scroll-smooth">
      
      {/* Global Animated Ambient Background — fixed to viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GardenAmbient chapter={activeChapter} />
      </div>

      <div className="relative z-10">
        <section ref={setRef(0)} data-chapter="1" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter1_TheSeed onComplete={() => scrollToNext(1)} />
        </section>

        <section ref={setRef(1)} data-chapter="2" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter2_Roots onComplete={() => scrollToNext(2)} />
        </section>

        <section ref={setRef(2)} data-chapter="3" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter3_Paths onComplete={() => scrollToNext(3)} />
        </section>

        <section ref={setRef(3)} data-chapter="4" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter4_Butterflies onComplete={() => scrollToNext(4)} />
        </section>

        <section ref={setRef(4)} data-chapter="5" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter5_Field onComplete={() => scrollToNext(5)} />
        </section>

        <section ref={setRef(5)} data-chapter="6" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter6_Fountain onComplete={() => scrollToNext(6)} />
        </section>

        <section ref={setRef(6)} data-chapter="7" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter7_Seasons onComplete={() => scrollToNext(7)} />
        </section>

        <section ref={setRef(7)} data-chapter="8" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter8_Greenhouse onComplete={() => scrollToNext(8)} />
        </section>

        <section ref={setRef(8)} data-chapter="9" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter9_GoldenFlower onComplete={() => scrollToNext(9)} />
        </section>

        <section ref={setRef(9)} data-chapter="10" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter10_Apology onComplete={() => scrollToNext(10)} />
        </section>

        <section ref={setRef(10)} data-chapter="11" className="w-full h-screen snap-start md:snap-center relative shrink-0">
          <Chapter11_Finale />
        </section>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { preetiData } from "@/lib/data";

export function PaperPlaneGift() {
  const [flown, setFlown] = useState(false);

  const flyPlane = () => {
    setFlown(true);
    
    // Soft pastel confetti
    const end = Date.now() + 3 * 1000;
    const colors = preetiData.confettiColors;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="w-full py-48 bg-[#fffcf5] flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
      
      {!flown ? (
        <motion.div 
          onClick={flyPlane}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer text-center"
        >
          {/* Simple CSS Paper Plane Representation */}
          <div className="w-0 h-0 border-t-[50px] border-t-transparent border-l-[100px] border-l-[#d97757] border-b-[50px] border-b-transparent relative left-4">
             <div className="absolute top-[-50px] left-[-100px] w-0 h-0 border-t-[50px] border-t-transparent border-l-[50px] border-l-[#a6563b] border-b-[50px] border-b-transparent transform scale-y-50 origin-bottom" />
          </div>
          <p className="font-caveat text-2xl text-[#2d4a3e] mt-8 tracking-wide">Send it flying...</p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#fff9e6] p-12 shadow-xl border-2 border-[#e6d5a7] max-w-lg text-center"
          style={{ borderRadius: "2% 3% 2% 4% / 3% 2% 4% 2%" }}
        >
          <h2 className="font-caveat text-5xl text-[#d97757] mb-6">Happy Birthday!</h2>
          <p className="font-caveat text-3xl text-[#2d4a3e] leading-relaxed">
            Thank you for painting our lives with joy, patience, and boundless creativity. 
            Here's to the masterpieces yet to come!
          </p>
        </motion.div>
      )}

      {/* Flown Plane Animation */}
      {flown && (
        <motion.div
          initial={{ x: "-50vw", y: "50vh", rotate: -45 }}
          animate={{ x: "150vw", y: "-50vh", rotate: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute z-50 opacity-50"
        >
          <div className="w-0 h-0 border-t-[50px] border-t-transparent border-l-[100px] border-l-[#d97757] border-b-[50px] border-b-transparent" />
        </motion.div>
      )}
    </section>
  );
}

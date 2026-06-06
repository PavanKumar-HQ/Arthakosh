"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function PaperPlaneOpening({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"fly-in" | "unfold" | "fade-out">("fly-in");

  useEffect(() => {
    const sequence = async () => {
      // Wait for plane to fly in
      await new Promise((r) => setTimeout(r, 2000));
      setStage("unfold");

      // Wait for user to read the letter
      await new Promise((r) => setTimeout(r, 5000));
      setStage("fade-out");

      // Wait for fade out
      await new Promise((r) => setTimeout(r, 1000));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <section className="absolute inset-0 flex items-center justify-center bg-[#fdf2f8] z-50 overflow-hidden">
      <AnimatePresence>
        {stage !== "fade-out" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="w-full h-full flex items-center justify-center relative"
          >
            {/* The Plane */}
            {stage === "fly-in" && (
              <motion.div
                initial={{ x: "-50vw", y: "50vh", rotate: -45, scale: 0.5 }}
                animate={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-32 h-32"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1" className="w-full h-full drop-shadow-lg">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </motion.div>
            )}

            {/* The Letter */}
            {stage === "unfold" && (
              <motion.div
                initial={{ rotateX: 90, scale: 0.5, opacity: 0 }}
                animate={{ rotateX: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="bg-white p-8 md:p-12 rounded-lg shadow-2xl max-w-lg w-[90%] border border-pink-100 relative"
              >
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-pink-300" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-pink-300" />
                
                <h2 className="font-caveat text-4xl md:text-5xl text-pink-600 mb-6">Dear Preeti Ma&apos;am,</h2>
                <p className="font-playfair text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Some lessons end with a bell.
                </p>
                <p className="font-playfair text-xl md:text-2xl text-gray-700 leading-relaxed mt-4 font-bold text-pink-500">
                  Yours never did.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

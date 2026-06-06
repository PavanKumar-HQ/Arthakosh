"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const BUTTERFLIES = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  x: `${10 + ((i * 137) % 80)}vw`,
  y: `${20 + ((i * 97) % 60)}vh`,
  duration: 4 + ((i * 7) % 3),
  delay: (i * 1.2) % 5,
}));

export function HiddenButterflies() {
  const [mounted, setMounted] = useState(false);
  const [selectedSecret, setSelectedSecret] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {BUTTERFLIES.map((b) => (
        <motion.div
          key={b.id}
          className="absolute w-8 h-8 pointer-events-auto cursor-pointer"
          style={{ left: b.x, top: b.y }}
          animate={{
            y: [0, -20, 10, -10, 0],
            x: [0, 10, -10, 5, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay
          }}
          onClick={() => setSelectedSecret("Remember that time we hid the chalks? She knew all along.")}
        >
          <svg viewBox="0 0 24 24" fill="#ec4899" className="w-full h-full drop-shadow-md opacity-80 hover:opacity-100 transition-opacity">
            <path d="M12 2c-.5 0-1 .5-1 1v6c-3-2-6-3-9-2 2 4 5 5 9 6-4 1-7 2-9 6 3 1 6 0 9-2v6c0 .5.5 1 1 1s1-.5 1-1v-6c3 2 6 3 9 2-2-4-5-5-9-6 4-1 7-2 9-6-3-1-6 0-9 2V3c0-.5-.5-1-1-1z" />
          </svg>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto bg-white/40 backdrop-blur-sm p-4"
            onClick={() => setSelectedSecret(null)}
          >
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border-2 border-pink-200">
              <Quote className="w-8 h-8 text-pink-400 mx-auto mb-4" />
              <p className="font-caveat text-3xl text-gray-700">{selectedSecret}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

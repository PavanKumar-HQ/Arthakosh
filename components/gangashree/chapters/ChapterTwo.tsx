"use client";

import { motion } from "framer-motion";

const QUOTES = [
  { text: "Don't overthink about things.", offset: "md:ml-12" },
  { text: "Don't think about what you can't do.", offset: "md:ml-64" },
  { text: "Don't waste your energy thinking about unnecessary things.", offset: "md:ml-24" },
  { text: "Join the energy session.", offset: "md:ml-56" },
];

export function ChapterTwo() {
  return (
    <section className="min-h-screen w-full py-32 px-4 relative bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-24"
        >
          <span className="text-amber-500/80 font-mono tracking-[0.2em] text-sm uppercase mb-6 block">
            Chapter II
          </span>
          <h2 className="font-playfair text-4xl md:text-6xl text-white leading-tight">
            The Words That Stayed
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24">
          {QUOTES.map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
              className={`p-8 md:p-12 border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-2xl ${quote.offset} max-w-2xl relative group`}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
              <p className="font-playfair italic text-2xl md:text-4xl text-gray-300 relative z-10 leading-relaxed">
                &quot;{quote.text}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

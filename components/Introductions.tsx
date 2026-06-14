"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function Introductions() {
  const router = useRouter();
  return (
    <section className="w-full py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center">
          
          {/* Gangashree's Card */}
          <motion.div
            onClick={() => router.push('/gangashree')}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="w-full max-w-sm bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-8 rounded-3xl shadow-2xl backdrop-blur-sm cursor-pointer group"
          >
            <div className="w-32 h-32 mx-auto bg-indigo-950 rounded-full mb-6 flex items-center justify-center overflow-hidden border-4 border-indigo-500/50 group-hover:border-indigo-400 transition-colors">
               <span className="text-indigo-300 font-mono text-sm">Photo</span>
            </div>
            <h3 className="text-3xl font-medium text-center text-indigo-100 mb-2">Gangashree</h3>
            <p className="text-indigo-200/70 text-center italic">
              "The best sister."
            </p>
          </motion.div>


        </div>
      </div>
    </section>
  );
}

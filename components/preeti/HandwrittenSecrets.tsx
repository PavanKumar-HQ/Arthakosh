"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { preetiData } from "@/lib/data";

export function HandwrittenSecrets() {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().includes(preetiData.secretAnswer.toLowerCase())) {
      setIsOpen(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <section className="w-full py-32 bg-[#fdfbf7] relative" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
      <div className="max-w-3xl mx-auto px-4">
        {!isOpen ? (
          <motion.div 
            className="bg-[#fff9e6] p-8 md:p-12 shadow-lg border-2 border-[#e6d5a7] relative"
            style={{ borderRadius: "1% 2% 1% 3% / 2% 1% 3% 1%" }}
          >
            <h2 className="text-4xl font-caveat text-[#d97757] text-center mb-8">A Locked Diary Entry</h2>
            <form onSubmit={checkAnswer} className="flex flex-col items-center gap-6">
              <label className="font-caveat text-3xl text-[#2d4a3e] text-center">
                {preetiData.secretQuestion}
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="bg-transparent border-b-2 border-[#6d8a7c] font-caveat text-2xl text-center text-[#2d4a3e] placeholder-[#6d8a7c]/50 focus:outline-none focus:border-[#d97757] transition-colors w-64"
                placeholder="Write here..."
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-[#d97757] text-white font-caveat text-2xl rounded-sm hover:bg-[#c26143] transition-colors shadow-sm rotate-1 hover:rotate-0"
              >
                Unlock
              </button>
              {error && <p className="font-caveat text-xl text-red-500">Hmm... not quite right.</p>}
            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-caveat text-[#d97757] text-center mb-12">Secrets Spilled</h2>
            {preetiData.secretMessages.map((msg, i) => (
              <div key={i} className="bg-[#fff9e6] p-8 shadow-[2px_2px_10px_rgba(0,0,0,0.05)] border-l-4 border-[#6d8a7c] relative">
                <div className="absolute top-2 left-2 text-[#6d8a7c] opacity-20 text-6xl font-serif">"</div>
                <p className="font-caveat text-3xl text-[#2d4a3e] relative z-10 leading-relaxed pl-6">
                  {msg}
                </p>
                <p className="font-caveat text-xl text-[#d97757] text-right mt-4">- The Backbenchers</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

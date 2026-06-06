"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Gamepad2, CheckCircle2, XCircle } from "lucide-react";

export function ClassroomArcade() {
  const [activeGame, setActiveGame] = useState<"guess" | "attendance" | "rapid" | null>(null);

  return (
    <section className="min-h-screen py-24 bg-white/50 relative flex flex-col items-center">
      <div className="text-center mb-16">
        <Gamepad2 className="w-16 h-16 text-pink-500 mx-auto mb-4" />
        <h2 className="font-playfair text-4xl md:text-6xl text-pink-600">Classroom Arcade</h2>
        <p className="font-sans text-gray-500 mt-4 max-w-lg mx-auto">Step up to the blackboard and see how well you remember the golden days.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4 w-full max-w-6xl">
        {/* Game 1 */}
        <GameCard 
          title="Guess Who Said It" 
          description="Match the iconic quotes to the teacher or student."
          color="bg-amber-100 border-amber-300"
          onClick={() => setActiveGame("guess")}
        />
        {/* Game 2 */}
        <GameCard 
          title="Attendance Challenge" 
          description="Find the missing students in the class photo."
          color="bg-emerald-100 border-emerald-300"
          onClick={() => setActiveGame("attendance")}
        />
        {/* Game 3 */}
        <GameCard 
          title="Rapid Fire" 
          description="Fun, quick trivia about school memories."
          color="bg-sky-100 border-sky-300"
          onClick={() => setActiveGame("rapid")}
        />
      </div>

      {/* Game Modal */}
      <AnimatePresence>
        {activeGame && (
          <GameModal game={activeGame} onClose={() => setActiveGame(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function GameCard({ title, description, color, onClick }: { title: string, description: string, color: string, onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full md:w-80 p-8 rounded-2xl cursor-pointer border-2 shadow-xl ${color} flex flex-col items-center text-center`}
    >
      <h3 className="font-playfair text-2xl text-gray-800 mb-4">{title}</h3>
      <p className="font-sans text-gray-600">{description}</p>
      <button className="mt-8 px-6 py-2 bg-white rounded-full font-bold text-gray-800 shadow-sm hover:shadow-md transition-shadow">
        Play Now
      </button>
    </motion.div>
  );
}

function GameModal({ game, onClose }: { game: string, onClose: () => void }) {
  const [step, setStep] = useState(0);

  // Placeholder Game Engine
  const renderGameContent = () => {
    if (game === "guess") {
      return (
        <div className="space-y-6">
          <h3 className="font-caveat text-4xl text-pink-600">"Is this a fish market?!"</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setStep(1)} className="p-4 bg-gray-100 rounded-lg hover:bg-pink-100 transition-colors">Preeti Ma'am</button>
            <button onClick={() => setStep(1)} className="p-4 bg-gray-100 rounded-lg hover:bg-pink-100 transition-colors">Meghana Ma'am</button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <p className="font-sans text-xl text-gray-600 mb-8">This game is currently under construction for the final build!</p>
        <button onClick={onClose} className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold">Return to Arcade</button>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-transparent/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-2xl relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 font-bold text-gray-400 hover:text-gray-800">Close</button>
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl text-gray-800 capitalize">{game.replace("-", " ")} Game</h2>
        </div>
        
        {step === 0 ? renderGameContent() : (
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
            <h3 className="font-playfair text-3xl text-gray-800 mb-4">Correct!</h3>
            <button onClick={onClose} className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold">Close Game</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

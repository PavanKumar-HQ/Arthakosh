"use client";

import { motion } from "framer-motion";

const PATHS = [
  { id: "rose", name: "The Rose Path", description: "Funny memories and classroom laughter.", color: "text-rose-700", hue: "hue-rotate-0" },
  { id: "sunflower", name: "The Sunflower Path", description: "Bright achievements and proud moments.", color: "text-amber-600", hue: "hue-rotate-90" },
  { id: "lavender", name: "The Lavender Path", description: "The most emotional and touching stories.", color: "text-purple-700", hue: "-hue-rotate-60" },
];

export function GardenPaths() {
  return (
    <div className="relative z-20 w-full min-h-[150vh] py-32 flex flex-col items-center">
      <h2 className="text-4xl md:text-6xl font-playfair text-emerald-900 mb-24 text-center">
        Wandering the Paths
      </h2>

      <div className="flex flex-col gap-40 w-full max-w-6xl px-8">
        {PATHS.map((path, index) => (
          <div 
            key={path.id} 
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* The Path Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-4xl md:text-5xl font-playfair mb-4 ${path.color}`}>
                {path.name}
              </h3>
              <p className="text-lg md:text-xl text-slate-600 font-sans leading-relaxed max-w-lg">
                {path.description}
              </p>
              <button className={`mt-8 px-8 py-3 rounded-full border-2 ${path.color.replace('text', 'border')} ${path.color} font-medium hover:bg-slate-50 transition-colors`}>
                Walk this path
              </button>
            </div>

            {/* The Path Visual (Cluster of colored flowers) */}
            <div className="flex-1 relative w-full h-64 flex items-center justify-center">
              <motion.img 
                src="/real-flower.png" 
                className={`absolute w-40 h-40 object-cover mix-blend-darken ${path.hue} z-10`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img 
                src="/real-flower.png" 
                className={`absolute w-32 h-32 object-cover mix-blend-darken ${path.hue} left-10 md:left-20 top-10 opacity-80`}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img 
                src="/real-flower.png" 
                className={`absolute w-24 h-24 object-cover mix-blend-darken ${path.hue} right-10 md:right-20 top-0 opacity-60`}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

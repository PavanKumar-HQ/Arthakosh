"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BrainCircuit, Zap, Activity, ShieldAlert } from "lucide-react";
import { BehaviorProfile, generateArchetypeText } from "@/lib/engines/behaviorEngine";

export default function BehaviorDashboard() {
  const [profile, setProfile] = useState<BehaviorProfile>({
    scarcityAbundance: 50,
    impulsiveCalculated: 50,
    anxiousConfident: 50,
  });

  const [isStressed, setIsStressed] = useState(false);
  const [archetypeText, setArchetypeText] = useState("");

  useEffect(() => {
    setArchetypeText(generateArchetypeText(profile));
  }, [profile]);

  const handleSliderChange = (key: keyof BehaviorProfile, value: number) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const triggerStressEvent = () => {
    if (isStressed) return;
    setIsStressed(true);
    
    // Simulate cognitive load by skewing sliders towards scarcity, impulsivity, and anxiety
    const originalProfile = { ...profile };
    setProfile({
      scarcityAbundance: Math.max(0, profile.scarcityAbundance - 30),
      impulsiveCalculated: Math.max(0, profile.impulsiveCalculated - 40),
      anxiousConfident: Math.max(0, profile.anxiousConfident - 40),
    });

    // Recover after 3 seconds
    setTimeout(() => {
      setProfile(originalProfile);
      setIsStressed(false);
    }, 3000);
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Activity className="w-8 h-8 text-amber-500" />
              Behavioral Mirror
            </h1>
            <p className="text-muted-foreground">Adjust the sliders to reveal your financial psychology and blind spots.</p>
          </div>
          <button 
            onClick={triggerStressEvent}
            disabled={isStressed}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-sm font-semibold hover:bg-red-500/20 transition-colors disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            {isStressed ? "Under Cognitive Load..." : "Inject Financial Stress"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Sliders Panel */}
          <div className="space-y-8">
            <Card className="p-6 bg-surface border-border/50">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-muted-foreground" />
                Mindset Canvas
              </h2>

              <div className="space-y-8">
                {/* Scarcity vs Abundance */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-4">
                    <span className="text-red-400">Scarcity Focus</span>
                    <span className="text-green-400">Abundance Focus</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={profile.scarcityAbundance}
                    onChange={(e) => handleSliderChange("scarcityAbundance", Number(e.target.value))}
                    className="w-full accent-amber-500 transition-all duration-300"
                    disabled={isStressed}
                  />
                </div>

                {/* Impulsive vs Calculated */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-4">
                    <span className="text-orange-400">Impulsive</span>
                    <span className="text-blue-400">Calculated</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={profile.impulsiveCalculated}
                    onChange={(e) => handleSliderChange("impulsiveCalculated", Number(e.target.value))}
                    className="w-full accent-amber-500 transition-all duration-300"
                    disabled={isStressed}
                  />
                </div>

                {/* Anxious vs Confident */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-4">
                    <span className="text-purple-400">Financially Anxious</span>
                    <span className="text-emerald-400">Highly Confident</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={profile.anxiousConfident}
                    onChange={(e) => handleSliderChange("anxiousConfident", Number(e.target.value))}
                    className="w-full accent-amber-500 transition-all duration-300"
                    disabled={isStressed}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Archetype Mirror */}
          <div>
            <Card className={`p-8 h-full transition-colors duration-500 relative overflow-hidden ${isStressed ? 'bg-red-950/20 border-red-500/50' : 'bg-surface-raised/50 border-border/50'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BrainCircuit className={`w-32 h-32 ${isStressed ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />
              </div>
              
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">Real-Time Archetype Profile</h3>
              
              <div className="prose prose-zinc dark:prose-invert relative z-10">
                <p className="text-lg leading-relaxed font-medium">
                  {archetypeText}
                </p>
              </div>

              {isStressed && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-500 text-sm">Stress Response Triggered</p>
                    <p className="text-xs text-red-400 mt-1">Cognitive load has temporarily degraded your decision quality and pushed you towards scarcity thinking. Do not make permanent financial decisions in this state.</p>
                  </div>
                </div>
              )}
            </Card>
          </div>

        </div>
      </AnimatedSection>
    </div>
  );
}

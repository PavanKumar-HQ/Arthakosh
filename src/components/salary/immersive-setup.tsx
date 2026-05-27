import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Scenario, RecruiterArchetype } from '@/types/salary';
import { Play, ArrowRight, TrendingUp, Building2, BrainCircuit, Activity } from 'lucide-react';

interface ImmersiveSetupProps {
  scenarios: Scenario[];
  selectedScenario: Scenario | null;
  selectedRecruiter: RecruiterArchetype | null;
  onSelectScenario: (s: Scenario) => void;
  onSelectRecruiter: (r: RecruiterArchetype) => void;
  onStart: () => void;
}

export function ImmersiveSetup({
  scenarios,
  selectedScenario,
  selectedRecruiter,
  onSelectScenario,
  onSelectRecruiter,
  onStart
}: ImmersiveSetupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto h-full flex flex-col pt-8 lg:pt-12 px-4 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 bg-violet/5 border-violet/20 text-violet">
          <BrainCircuit className="w-3.5 h-3.5 mr-1" />
          Strategic Simulation Environment
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Prepare for Negotiation
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Before entering the simulation, analyze the company's cultural signals and build a psychological profile of your counterparty.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Left: Scenarios */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4" /> Target Company
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className={`p-5 cursor-pointer border transition-all duration-300 hover:shadow-md ${
                  selectedScenario?.id === scenario.id
                    ? "border-violet ring-1 ring-violet shadow-sm bg-violet/[0.02]"
                    : "border-border hover:border-violet/40"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-base text-foreground mb-1">{scenario.title}</h4>
                    <p className="text-xs text-muted-foreground">{scenario.role} • {scenario.experience}</p>
                  </div>
                  {selectedScenario?.id === scenario.id && (
                    <div className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                  )}
                </div>
                
                <div className="bg-background rounded-lg p-3 border border-border/50 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Market Range:</span>
                    <span className="font-medium">{scenario.marketRange}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Initial Base:</span>
                    <span className="font-medium text-emerald">₹{scenario.initialBase} LPA</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Recruiter Profile */}
        <div className="lg:col-span-7 flex flex-col">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground flex items-center gap-2 mb-6">
            <Activity className="w-4 h-4" /> Psychological Profiling
          </h3>
          
          <div className="flex-1 bg-card border border-border/50 rounded-2xl p-6 shadow-sm overflow-y-auto scrollbar-hide">
            {!selectedScenario ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60">
                <BrainCircuit className="w-12 h-12 mb-4 opacity-50" />
                <p>Select a target company to intercept recruiter intelligence.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedScenario.recruiters.map((recruiter) => (
                    <div 
                      key={recruiter.id}
                      onClick={() => onSelectRecruiter(recruiter)}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${
                        selectedRecruiter?.id === recruiter.id 
                          ? 'border-violet bg-violet/5 ring-1 ring-violet'
                          : 'border-border bg-background hover:border-violet/40 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{recruiter.avatar}</span>
                        <div>
                          <div className="font-semibold text-sm">{recruiter.name}</div>
                          <div className="text-[10px] text-muted-foreground">{recruiter.role}</div>
                        </div>
                      </div>
                      
                      <div className="pt-3 mt-3 border-t border-border/30 space-y-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Style</span>
                          <span className="text-xs font-medium text-foreground">{recruiter.negotiationStyle}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Signals</span>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {recruiter.behavioralTendencies?.map((t, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <ArrowRight className="w-3 h-3 mt-0.5 text-violet shrink-0" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedRecruiter && (
                  <div className="pt-6 border-t border-border/50">
                    <Button 
                      onClick={onStart}
                      className="w-full h-12 text-sm font-semibold tracking-wide bg-foreground text-background hover:bg-foreground/90 transition-all shadow-md group"
                    >
                      <Play className="w-4 h-4 mr-2 fill-current transition-transform group-hover:translate-x-0.5" />
                      ENTER NEGOTIATION ENVIRONMENT
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

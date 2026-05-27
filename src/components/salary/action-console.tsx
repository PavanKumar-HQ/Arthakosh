import { motion, AnimatePresence } from 'framer-motion';
import { UserChoice, ThinkingMoment } from '@/types/salary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Lightbulb, Play, Clock } from 'lucide-react';
import { useState } from 'react';

interface ActionConsoleProps {
  choices: UserChoice[];
  onSelectChoice: (choice: UserChoice) => void;
  disabled: boolean;
  thinkingMoment?: ThinkingMoment;
}

export function ActionConsole({ choices, onSelectChoice, disabled, thinkingMoment }: ActionConsoleProps) {
  const [showThinking, setShowThinking] = useState(!!thinkingMoment);

  // If a new thinking moment arrives and it's not currently shown, show it (if choices change, state resets might be needed, but we can rely on disabled state for transitions)
  
  return (
    <div className="bg-background border-t border-border/40 p-4 lg:p-6 shrink-0 z-10 relative">
      <AnimatePresence mode="wait">
        {thinkingMoment && showThinking && !disabled ? (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-violet/5 border border-violet/20 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-violet text-white border-none shadow-sm">
                  <Lightbulb className="w-3.5 h-3.5 mr-1.5" />
                  {thinkingMoment.title}
                </Badge>
              </div>
              <p className="text-sm text-foreground font-medium mb-2">{thinkingMoment.insight}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">{thinkingMoment.strategicAdvice}</p>
              
              <div className="flex justify-end">
                <Button onClick={() => setShowThinking(false)} className="bg-foreground text-background hover:bg-foreground/90 shadow-sm text-xs h-9 px-6 rounded-lg">
                  Acknowledge & Respond
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="choices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-3"
          >
            {disabled && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-20 flex items-center justify-center rounded-t-2xl">
                <div className="bg-background border border-border shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  Recruiter is typing...
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Response Strategy</span>
            </div>

            <div className="grid grid-cols-1 gap-3 relative z-10">
              {choices.map((choice) => {
                const isAggressive = choice.impact.stressChange > 10;
                const isPassive = choice.impact.leverageChange < 0;
                
                return (
                  <button
                    key={choice.id}
                    onClick={() => {
                      if (!disabled) {
                        onSelectChoice(choice);
                        if (thinkingMoment) setShowThinking(true);
                      }
                    }}
                    disabled={disabled}
                    className="group text-left p-4 rounded-xl border border-border/50 bg-card hover:border-violet/40 hover:bg-violet/[0.02] hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet/30 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-[10px] uppercase tracking-wider px-2 py-0 h-5 ${
                          isAggressive ? 'text-rose-500 border-rose-500/30 bg-rose-500/5' : 
                          isPassive ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/5' : 
                          'text-violet border-violet/30 bg-violet/5'
                        }`}
                      >
                        {choice.strategyLabel}
                      </Badge>
                      
                      {isAggressive && (
                        <span className="flex items-center text-[9px] text-rose-500 font-medium">
                          <AlertTriangle className="w-3 h-3 mr-1" /> High Tension
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                      "{choice.text}"
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

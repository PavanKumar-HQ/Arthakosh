import { motion } from 'framer-motion';
import { RecruiterArchetype, Compensation } from '@/types/salary';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, TrendingUp, Zap, Target, Activity } from 'lucide-react';

interface IntelligenceDashboardProps {
  recruiter: RecruiterArchetype;
  currentLeverage: number;
  stressLevel: number;
  currentBase: number;
}

export function IntelligenceDashboard({
  recruiter,
  currentLeverage,
  stressLevel,
  currentBase
}: IntelligenceDashboardProps) {
  return (
    <div className="flex flex-col h-full bg-card border-l border-border/40 p-4 lg:p-6 overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-4 h-4 text-violet" />
        <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Tactical Intelligence</h3>
      </div>

      <div className="space-y-8">
        {/* Recruiter State */}
        <section>
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> Target Profile
          </h4>
          <div className="bg-background rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{recruiter.avatar}</span>
              <div>
                <div className="font-medium text-sm">{recruiter.name}</div>
                <div className="text-[10px] text-muted-foreground">{recruiter.role}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  <span>Base Leverage</span>
                  <span>{recruiter.baseLeverage}%</span>
                </div>
                <Progress value={recruiter.baseLeverage} className="h-1 bg-secondary" />
              </div>
              <div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  <span>Pressure Frequency</span>
                  <span>{recruiter.pressureFrequency * 100}%</span>
                </div>
                <Progress value={recruiter.pressureFrequency * 100} className="h-1 bg-secondary" />
              </div>
            </div>
          </div>
        </section>

        {/* Live Metrics */}
        <section>
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Live Metrics
          </h4>
          <div className="space-y-4">
            <div className="bg-background rounded-xl p-4 border border-border/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-foreground">Negotiation Leverage</span>
                <span className="text-xs font-bold text-violet">{currentLeverage}%</span>
              </div>
              <Progress value={currentLeverage} className="h-1.5 bg-secondary" />
              <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                {currentLeverage > 60 ? "You have strong control. Push for higher base." : currentLeverage > 40 ? "Balanced. Maintain professional boundaries." : "Low leverage. Risk of offer withdrawal is rising."}
              </p>
            </div>

            <div className="bg-background rounded-xl p-4 border border-border/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-foreground">Counterparty Tension</span>
                <span className="text-xs font-bold text-rose-500">{stressLevel}%</span>
              </div>
              <Progress value={stressLevel} className="h-1.5 bg-secondary [&>div]:bg-rose-500" />
              <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                {stressLevel > 70 ? "High risk of breaking negotiations." : stressLevel > 40 ? "Recruiter is feeling pushed." : "Safe to apply more pressure."}
              </p>
            </div>
          </div>
        </section>

        {/* Comp Tracker */}
        <section>
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> Compensation Tracker
          </h4>
          <div className="bg-background rounded-xl p-4 border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald" />
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Current Base Offer</span>
                <span className="text-xl font-bold text-foreground">₹{currentBase.toFixed(1)}L</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Target Ceiling</span>
                <span className="text-sm font-medium text-muted-foreground">₹{recruiter.maxOffer.base.toFixed(1)}L</span>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">Current Total Value</span>
              <div className="flex flex-wrap gap-1.5">
                {recruiter.initialOffer.bonus ? <Badge variant="secondary" className="text-[9px]">Bonus: ₹{recruiter.initialOffer.bonus}L</Badge> : null}
                {recruiter.initialOffer.equity !== 'None' ? <Badge variant="secondary" className="text-[9px]">Equity: {recruiter.initialOffer.equity}</Badge> : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

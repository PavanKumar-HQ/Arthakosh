import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/constants";
import { Goal } from "@/types";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { HealthIndicator } from "./HealthIndicator";
import { Target, Clock, ArrowRight } from "lucide-react";

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
  isActive?: boolean;
}

export function GoalCard({ goal, onClick, isActive }: GoalCardProps) {
  const progress = Math.min(
    100,
    Math.round((goal.currentSavings / goal.targetAmount) * 100)
  );

  return (
    <Card
      onClick={onClick}
      className={`p-5 card-hover cursor-pointer relative overflow-hidden transition-all duration-300 ${
        isActive ? "ring-2 ring-foreground shadow-md" : "hover:border-foreground/30"
      }`}
    >
      {/* Subtle color gradient based on goal color */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: goal.color }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label={goal.name}>
              {goal.icon}
            </span>
            <h3 className="text-sm font-semibold text-foreground">{goal.name}</h3>
          </div>
          {goal.healthStatus && <HealthIndicator status={goal.healthStatus} />}
        </div>
        
        <div className="flex items-center gap-4 mt-6">
          <ProgressRing progress={progress} size={64} strokeWidth={5} color={goal.color}>
            <span className="text-xs font-bold font-tabular">{progress}%</span>
          </ProgressRing>
          <div>
            <p className="text-lg font-bold font-tabular">{formatCurrency(goal.currentSavings)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              of {formatCurrency(goal.targetAmount)} target
            </p>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-border/40 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Monthly SIP
            </p>
            <p className="text-sm font-medium font-tabular">
              {formatCurrency(goal.monthlyContribution)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
              Timeline
            </p>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              {goal.timeline < 12 ? `${goal.timeline} mo` : `${Math.round(goal.timeline / 12)} yrs`}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="capitalize">{goal.priority} priority</span>
          <span className="flex items-center group-hover:text-foreground transition-colors">
            View details <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </Card>
  );
}

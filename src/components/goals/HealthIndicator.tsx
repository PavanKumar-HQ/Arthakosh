import { HealthStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, AlertCircle, AlertTriangle, ShieldAlert } from "lucide-react";

interface HealthIndicatorProps {
  status: HealthStatus;
  className?: string;
}

export function HealthIndicator({ status, className = "" }: HealthIndicatorProps) {
  const config = {
    excellent: {
      icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />,
      label: "Excellent",
      classes: "bg-emerald/10 text-emerald border-emerald/20",
    },
    achievable: {
      icon: <TrendingUp className="w-3.5 h-3.5 mr-1.5" />,
      label: "Achievable",
      classes: "bg-blue-accent/10 text-blue-accent border-blue-accent/20",
    },
    tight: {
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1.5" />,
      label: "Tight Timeline",
      classes: "bg-amber/10 text-amber border-amber/20",
    },
    underfunded: {
      icon: <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />,
      label: "Underfunded",
      classes: "bg-rose/10 text-rose border-rose/20",
    },
    high_risk: {
      icon: <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />,
      label: "High Risk",
      classes: "bg-rose/10 text-rose border-rose/40 font-semibold",
    },
  };

  const current = config[status] || config.achievable;

  return (
    <Badge variant="outline" className={`px-2.5 py-0.5 rounded-full ${current.classes} ${className}`}>
      {current.icon}
      {current.label}
    </Badge>
  );
}

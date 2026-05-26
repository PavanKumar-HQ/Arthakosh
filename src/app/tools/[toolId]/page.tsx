"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SIPCalculator } from "@/components/tools/SIPCalculator";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { EmergencyFundPlanner } from "@/components/tools/EmergencyFundPlanner";
import { TaxEstimator } from "@/components/tools/TaxEstimator";
import { InflationCalculator } from "@/components/tools/InflationCalculator";
import { InsuranceEstimator } from "@/components/tools/InsuranceEstimator";
import { NetWorthTracker } from "@/components/tools/NetWorthTracker";
import { DebtSnowballPlanner } from "@/components/tools/DebtSnowballPlanner";
import { CreditScoreSimulator } from "@/components/tools/CreditScoreSimulator";

const toolComponents: Record<string, React.ComponentType> = {
  "sip-calculator": SIPCalculator,
  "emi-calculator": EMICalculator,
  "emergency-fund": EmergencyFundPlanner,
  "tax-estimator": TaxEstimator,
  "inflation-calculator": InflationCalculator,
  "insurance-estimator": InsuranceEstimator,
  "net-worth": NetWorthTracker,
  "debt-snowball": DebtSnowballPlanner,
  "credit-simulator": CreditScoreSimulator,
};

export default function ToolPage() {
  const params = useParams();
  const toolId = params.toolId as string;
  const ToolComponent = toolComponents[toolId];

  if (!ToolComponent) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
        <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground underline">
          ← Back to tools
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        All Tools
      </Link>
      <ToolComponent />
    </div>
  );
}

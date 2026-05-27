export interface BehaviorProfile {
  scarcityAbundance: number; // 0 (Scarcity) to 100 (Abundance)
  impulsiveCalculated: number; // 0 (Impulsive) to 100 (Calculated)
  anxiousConfident: number; // 0 (Anxious) to 100 (Confident)
}

export function generateArchetypeText(profile: BehaviorProfile): string {
  let text = "Your financial operating system is currently driven by a ";

  // Core mindset
  if (profile.scarcityAbundance < 30) {
    text += "deep sense of scarcity. You view money as a finite resource that is easily lost, leading to hoarding behaviors and an inability to invest in long-term growth. ";
  } else if (profile.scarcityAbundance > 70) {
    text += "strong abundance mindset. You view capital as a tool for expansion, though you risk over-leveraging if optimism blinds you to downside protection. ";
  } else {
    text += "pragmatic balance of preservation and growth. You aren't paralyzed by loss, but you aren't reckless with expansion either. ";
  }

  // Execution style
  if (profile.impulsiveCalculated < 30) {
    text += "When making decisions, you are highly impulsive, often letting emotional triggers dictate spending or panic-selling during volatility. ";
  } else if (profile.impulsiveCalculated > 70) {
    text += "Your execution is ruthlessly calculated. You rely heavily on spreadsheets and logic, sometimes missing out on qualitative opportunities because they don't fit a formula. ";
  } else {
    text += "Your decision-making is adaptable, blending intuition with baseline logic. ";
  }

  // Stress response
  if (profile.anxiousConfident < 30) {
    text += "However, under pressure, you experience high financial anxiety. Market drops or sudden expenses cause significant cognitive load, leading to defensive retreating.";
  } else if (profile.anxiousConfident > 70) {
    text += "Crucially, you remain highly confident under pressure. Market crashes are viewed as buying opportunities, and you rarely flinch at unexpected expenses.";
  } else {
    text += "Under pressure, you experience normal stress but generally maintain enough composure to avoid catastrophic mistakes.";
  }

  return text;
}

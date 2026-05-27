export interface SkillNode {
  id: string;
  name: string;
  category: "technical" | "soft" | "domain" | "leadership";
  level: number; // 1-5
  marketPremium: number; // Percentage increase to base salary (e.g. 0.05 for 5%)
}

export interface CareerState {
  currentRole: string;
  baseSalary: number;
  yearsExperience: number;
  skills: SkillNode[];
}

export function calculateHumanCapitalValue(state: CareerState): {
  projectedSalary: number;
  skillPremium: number;
  experiencePremium: number;
} {
  // Base compound for years of experience (approx 4% per year on average)
  const experiencePremium = state.baseSalary * (Math.pow(1.04, state.yearsExperience) - 1);
  
  // Compounding skill premiums
  const totalSkillMultiplier = state.skills.reduce((acc, skill) => {
    // A level 5 skill gives the full market premium, level 1 gives 1/5th
    const effectivePremium = skill.marketPremium * (skill.level / 5);
    return acc * (1 + effectivePremium);
  }, 1);
  
  const skillPremiumAmount = (state.baseSalary + experiencePremium) * (totalSkillMultiplier - 1);
  
  return {
    projectedSalary: state.baseSalary + experiencePremium + skillPremiumAmount,
    skillPremium: skillPremiumAmount,
    experiencePremium: experiencePremium
  };
}

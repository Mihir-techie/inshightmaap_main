export type SubscriptionPlan = "free" | "student" | "pro" | "team";

export interface PlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: number;
  duration: string;
  limit: number; // in minutes or Infinity for unlimited
  unit: string;
}

export const PLAN_DETAILS: Record<SubscriptionPlan, PlanDetails> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    duration: "10 mins demo",
    limit: 10,
    unit: "minutes",
  },
  student: {
    id: "student",
    name: "Student",
    price: 99,
    duration: "1 hour/month",
    limit: 60,
    unit: "minutes",
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 299,
    duration: "5 hours/month",
    limit: 300,
    unit: "minutes",
  },
  team: {
    id: "team",
    name: "Team",
    price: 999,
    duration: "Unlimited/day",
    limit: Infinity,
    unit: "unlimited",
  },
};

export const getCurrentPlan = (): SubscriptionPlan => {
  try {
    const plan = localStorage.getItem("currentPlan");
    if (plan && plan in PLAN_DETAILS) {
      return plan as SubscriptionPlan;
    }
  } catch (e) {
    console.error("Error reading plan:", e);
  }
  return "free";
};

export const setCurrentPlan = (plan: SubscriptionPlan): void => {
  localStorage.setItem("currentPlan", plan);
  // Set expiry 30 days from now
  const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  localStorage.setItem("planExpiry", expiry.toISOString());
};

export const checkPlanLimit = (usedMinutes: number): { canUse: boolean; remaining: number } => {
  const plan = getCurrentPlan();
  const planDetails = PLAN_DETAILS[plan];
  
  if (planDetails.limit === Infinity) {
    return { canUse: true, remaining: Infinity };
  }
  
  const remaining = planDetails.limit - usedMinutes;
  return { canUse: remaining > 0, remaining: Math.max(0, remaining) };
};

export const getPlanDetails = (plan?: SubscriptionPlan): PlanDetails => {
  const currentPlan = plan || getCurrentPlan();
  return PLAN_DETAILS[currentPlan];
};

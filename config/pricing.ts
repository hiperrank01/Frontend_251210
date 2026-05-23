export type MembershipPlan = {
  period: string;
  price: number;
  popular: boolean;
};

export const MEMBERSHIP_PLANS: readonly MembershipPlan[] = [
  { period: "1개월", price: 7900, popular: false },
  { period: "3개월", price: 19800, popular: true },
  { period: "1년", price: 80000, popular: false },
] as const;

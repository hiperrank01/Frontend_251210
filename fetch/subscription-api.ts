import { handleApiResponse } from "@/lib/api-utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const SUBSCRIPTION_PATHS = {
  CREATE: `${API_BASE_URL}/api/subscription/`,
  STATUS: `${API_BASE_URL}/api/subscription/status/`,
  CANCEL: `${API_BASE_URL}/api/subscription/cancel/`,
  CANCEL_IMMEDIATELY: `${API_BASE_URL}/api/subscription/cancel-immediately/`,
  RESUBSCRIBE: `${API_BASE_URL}/api/subscription/resubscribe/`,
  CHANGE_PLAN: `${API_BASE_URL}/api/subscription/change-plan/`,
  CHANGE_CARD: `${API_BASE_URL}/api/subscription/change-card/`,
  PAYMENTS: `${API_BASE_URL}/api/subscription/payments/`,
};

function authHeaders() {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// --- Types ---

export interface SubscriptionPlan {
  id: string;
  name: string;
  durationMonths: number;
  basePrice: number;
  vat: number;
  totalPrice: number;
  isActive: boolean;
}

export interface BillingKeyInfo {
  id: number;
  cardName: string | null;
  cardNumberMasked: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface SubscriptionStatus {
  id: number;
  plan: SubscriptionPlan;
  billingKeyInfo: BillingKeyInfo | null;
  status: string;
  statusDisplay: string;
  startedAt: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextPaymentDate: string | null;
  cancelledAt: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionResponse {
  subscriptionId: number;
  plan: string;
  status: string;
  currentPeriodEnd: string;
  nextPaymentDate: string;
  payment: {
    paymentId: string;
    amount: number;
    paidAt: string;
  };
}

export interface PaymentRecord {
  id: number;
  paymentId: string;
  amount: number;
  status: string;
  statusDisplay: string;
  paidAt: string | null;
  failedAt: string | null;
  failureReason: string | null;
  refundedAt: string | null;
  refundAmount: number | null;
  createdAt: string;
}

// --- API Functions ---

export async function createSubscription(params: {
  billingKey: string;
  planId: string;
  issueId: string;
  cardName?: string;
  cardNumberMasked?: string;
}): Promise<CreateSubscriptionResponse> {
  const res = await fetch(SUBSCRIPTION_PATHS.CREATE, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      billing_key: params.billingKey,
      plan_id: params.planId,
      issue_id: params.issueId,
      card_name: params.cardName,
      card_number_masked: params.cardNumberMasked,
    }),
  });
  return handleApiResponse(res);
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  const res = await fetch(SUBSCRIPTION_PATHS.STATUS, {
    method: "GET",
    headers: authHeaders(),
  });
  return handleApiResponse(res);
}

export async function cancelSubscription(
  cancelReason?: string,
): Promise<{ detail: string; currentPeriodEnd: string }> {
  const res = await fetch(SUBSCRIPTION_PATHS.CANCEL, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ cancel_reason: cancelReason || "" }),
  });
  return handleApiResponse(res);
}

export async function cancelSubscriptionImmediately(
  cancelReason?: string,
): Promise<{ detail: string; refundAmount: number }> {
  const res = await fetch(SUBSCRIPTION_PATHS.CANCEL_IMMEDIATELY, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ cancel_reason: cancelReason || "" }),
  });
  return handleApiResponse(res);
}

export async function getPaymentHistory(): Promise<{
  results: PaymentRecord[];
}> {
  const res = await fetch(SUBSCRIPTION_PATHS.PAYMENTS, {
    method: "GET",
    headers: authHeaders(),
  });
  return handleApiResponse(res);
}

export async function resubscribe(params: {
  billingKey: string;
  issueId: string;
  cardName?: string;
  cardNumberMasked?: string;
}): Promise<{ detail: string; subscription: SubscriptionStatus }> {
  const res = await fetch(SUBSCRIPTION_PATHS.RESUBSCRIBE, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({
      billing_key: params.billingKey,
      issue_id: params.issueId,
      card_name: params.cardName,
      card_number_masked: params.cardNumberMasked,
    }),
  });
  return handleApiResponse(res);
}

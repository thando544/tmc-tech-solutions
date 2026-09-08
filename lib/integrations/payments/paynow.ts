import "server-only";
import { Paynow } from "paynow";
import { requireEnv } from "@/lib/integrations/config";
import { getSiteUrl } from "@/lib/agent/site";

export type PaynowInit = {
  success: boolean;
  redirectUrl?: string;
  pollUrl?: string;
  instructions?: string;
  error?: string;
  status?: string;
};

export function bookingPaymentUrls(request: Request, reference: string) {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`.replace(/\/$/, "");
  const publicOrigin = getSiteUrl();
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  const resultOrigin = local ? publicOrigin : origin;

  return {
    returnUrl: `${origin}/book/return?reference=${encodeURIComponent(reference)}`,
    resultUrl: `${resultOrigin}/api/bookings/paynow/update`
  };
}

export function createPaynowClient(resultUrl: string, returnUrl: string) {
  return new Paynow(
    requireEnv("PAYNOW_INTEGRATION_ID"),
    requireEnv("PAYNOW_INTEGRATION_KEY"),
    resultUrl,
    returnUrl
  );
}

export async function initiatePaynowCheckout(input: {
  reference: string;
  email: string;
  description: string;
  amount: number;
  resultUrl: string;
  returnUrl: string;
}) {
  const paynow = createPaynowClient(input.resultUrl, input.returnUrl);
  const payment = paynow.createPayment(input.reference, input.email);
  payment.add(input.description, input.amount);

  const response = await paynow.send(payment);
  if (!response?.success || !response.redirectUrl || !response.pollUrl) {
    throw new Error(mapPaynowError(response?.error) || "Paynow did not return a checkout URL.");
  }

  return {
    redirectUrl: response.redirectUrl,
    pollUrl: response.pollUrl
  };
}

export async function pollPaynow(pollUrl: string, resultUrl: string, returnUrl: string) {
  const paynow = createPaynowClient(resultUrl, returnUrl);
  const response = await paynow.pollTransaction(pollUrl);
  return {
    status: String(response?.status ?? "unknown").toLowerCase(),
    success: Boolean(response?.success),
    pollUrl: response?.pollUrl,
    error: response?.error
  } satisfies PaynowInit & { status: string };
}

export function parsePaynowUpdate(body: string) {
  const paynow = createPaynowClient("https://www.tmctechsolutions.com/api/bookings/paynow/update", "https://www.tmctechsolutions.com/book/return");
  return paynow.parseStatusUpdate(body);
}

export function isPaidStatus(status: string | undefined) {
  return String(status ?? "").toLowerCase() === "paid";
}

function mapPaynowError(error?: string) {
  const text = String(error ?? "");
  if (/test mode/i.test(text) && /authemail/i.test(text)) {
    return "Paynow is in test mode. Use the merchant email registered on that Paynow account, or switch the integration to live and update PAYNOW_INTEGRATION_ID and PAYNOW_INTEGRATION_KEY.";
  }
  return text;
}

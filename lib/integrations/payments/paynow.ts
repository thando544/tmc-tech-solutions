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
  method?: "web" | "ecocash" | "onemoney";
};

export function bookingPaymentUrls(request: Request, reference: string) {
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`.replace(/\/$/, "");
  const publicOrigin = getSiteUrl();
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  const resultOrigin = local ? publicOrigin : origin;
  const returnOrigin = local ? publicOrigin : origin;

  return {
    returnUrl: `${returnOrigin}/book/return?reference=${encodeURIComponent(reference)}`,
    resultUrl: `${resultOrigin}/api/bookings/paynow/update`
  };
}

export function normalizeZimMsisdn(raw: string | undefined | null) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (!digits) {
    return null;
  }

  let local = digits;
  if (digits.startsWith("263") && digits.length >= 12) {
    local = `0${digits.slice(3)}`;
  } else if (digits.length === 9 && digits.startsWith("7")) {
    local = `0${digits}`;
  }

  return /^07[1378]\d{7}$/.test(local) ? local : null;
}

export function mobileMethodForPhone(msisdn: string): "ecocash" | "onemoney" | null {
  if (msisdn.startsWith("077") || msisdn.startsWith("078")) {
    return "ecocash";
  }
  if (msisdn.startsWith("071")) {
    return "onemoney";
  }
  return null;
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
  phone?: string;
  description: string;
  amount: number;
  resultUrl: string;
  returnUrl: string;
}) {
  const paynow = createPaynowClient(input.resultUrl, input.returnUrl);
  const authEmail = process.env.PAYNOW_AUTH_EMAIL?.trim() || input.email;
  const payment = paynow.createPayment(input.reference, authEmail);
  payment.add(input.description, input.amount);

  const msisdn = normalizeZimMsisdn(input.phone);
  const method = msisdn ? mobileMethodForPhone(msisdn) : null;

  let used: PaynowInit["method"] = "web";
  let response = method && msisdn ? await paynow.sendMobile(payment, msisdn, method) : undefined;

  if (method && response?.success && response.pollUrl) {
    used = method;
  } else {
    if (method && response?.error) {
      used = "web";
    }
    response = await paynow.send(payment);
    used = "web";
  }

  if (!response?.success || !response.pollUrl) {
    throw new Error(mapPaynowError(response?.error) || "Paynow did not return a checkout.");
  }

  const redirectUrl = response.redirectUrl ? String(response.redirectUrl) : undefined;
  if (used === "web" && !redirectUrl) {
    throw new Error(mapPaynowError(response.error) || "Paynow did not return a checkout URL.");
  }

  return {
    redirectUrl,
    pollUrl: String(response.pollUrl),
    instructions:
      response.instructions != null
        ? String(response.instructions)
        : used === "ecocash"
          ? "Check your phone and approve the EcoCash prompt from Paynow."
          : used === "onemoney"
            ? "Check your phone and approve the OneMoney prompt from Paynow."
            : undefined,
    method: used
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
  const paynow = createPaynowClient(
    "https://www.tmctechsolutions.com/api/bookings/paynow/update",
    "https://www.tmctechsolutions.com/book/return"
  );
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

declare module "paynow" {
  export class Payment {
    reference: string;
    authEmail: string;
    add(title: string, amount: number, quantity?: number): Payment;
    info(): string;
    total(): number;
  }

  export class InitResponse {
    success: boolean;
    status: string;
    hasRedirect: boolean;
    redirectUrl?: string;
    pollUrl?: string;
    error?: string;
    instructions?: string;
    isInnbucks?: boolean;
  }

  export class StatusResponse {
    reference?: string;
    amount?: string;
    paynowReference?: string;
    pollUrl?: string;
    status?: string;
    error?: string;
  }

  export class Paynow {
    integrationId: string;
    integrationKey: string;
    resultUrl: string;
    returnUrl: string;
    constructor(integrationId: string, integrationKey: string, resultUrl?: string, returnUrl?: string);
    createPayment(reference: string, authEmail: string): Payment;
    send(payment: Payment): Promise<InitResponse | undefined>;
    sendMobile(payment: Payment, phone: string, method: string): Promise<InitResponse | undefined>;
    pollTransaction(url: string): Promise<InitResponse | undefined>;
    parseStatusUpdate(response: string): StatusResponse;
  }
}

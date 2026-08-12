export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ServiceStatus = "pending" | "provisioning" | "active" | "suspended" | "cancelled" | "terminated";
export type ServiceType = "shared_hosting" | "vps_hosting";
export type InvoiceStatus = "draft" | "open" | "paid" | "void" | "overdue";
export type TicketStatus = "open" | "pending" | "resolved" | "closed";

export type HostingService = {
  id: string;
  user_id: string;
  plan_id: string | null;
  server_id: string | null;
  service_type: ServiceType;
  status: ServiceStatus;
  primary_domain: string | null;
  created_at: string;
};

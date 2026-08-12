export type HostingPackage = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  billing_cycle: "monthly" | "yearly" | "one_time";
  storage_gb: number;
  bandwidth_gb: number;
  websites_limit: number;
  email_accounts_limit: number;
  databases_limit: number;
  support_level: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type HostingOrder = {
  id: string;
  user_id: string;
  package_id: string;
  domain: string;
  status: "pending" | "provisioning" | "active" | "suspended" | "failed" | "cancelled";
  cyberpanel_package_name: string;
  provisioned_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
  hosting_packages?: Pick<HostingPackage, "name" | "slug" | "price" | "currency" | "billing_cycle">;
  profiles?: { email: string; full_name: string | null };
};

export type HostingAccount = {
  id: string;
  user_id: string;
  order_id: string;
  package_id: string;
  domain: string;
  server_ip: string | null;
  panel_url: string | null;
  status: "active" | "suspended" | "terminated";
  cyberpanel_package_name: string;
  created_at: string;
  updated_at: string;
  hosting_packages?: Pick<HostingPackage, "name" | "slug">;
  hosting_orders?: Pick<HostingOrder, "status" | "created_at">;
};

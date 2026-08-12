import { NextRequest } from "next/server";
import { auditLog } from "@/lib/actions/audit";
import { withAuthedApi } from "@/lib/api/handler";
import { SetupRequiredError } from "@/lib/api/errors";
import { createAdminClient } from "@/lib/supabase/admin";
import { defaultNameservers } from "@/lib/catalog";
import { nameserverUpdateSchema } from "@/lib/validations/contact";

export async function POST(request: NextRequest) {
  const rawBody = await request.json();
  const body = nameserverUpdateSchema.parse({
    ...rawBody,
    nameservers: rawBody.resetToDefault ? [...defaultNameservers] : rawBody.nameservers
  });

  return withAuthedApi(request, "domains", "updateNameservers", async (userId) => {
    const supabase = createAdminClient();
    const { data: domain } = await supabase.from("domains").select("id, domain_name").eq("id", body.domainId).eq("user_id", userId).single();

    if (!domain) {
      throw new Error("Domain not found.");
    }

    await auditLog({
      userId,
      action: "nameserver_update_requested",
      resourceType: "domain",
      resourceId: body.domainId,
      metadata: { domainName: domain.domain_name, nameservers: body.nameservers }
    });

    throw new SetupRequiredError("OpenSRS nameserver update mapping is prepared but registrar credentials/API mapping are not connected yet.");
  });
}

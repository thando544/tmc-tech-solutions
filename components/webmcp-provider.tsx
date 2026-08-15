"use client";

import { useEffect } from "react";
import { company, services } from "@/content/site";

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
};

type ModelContext = {
  registerTool?: (tool: WebMcpTool) => void | Promise<void> | (() => void);
  provideContext?: (context: { tools: WebMcpTool[] }) => void | Promise<void>;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const tools: WebMcpTool[] = [
  {
    name: "navigate",
    description: "Navigate this site to a public page: home, about, services, or contact.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        path: {
          type: "string",
          enum: ["/", "/about", "/services", "/contact"],
          description: "Site path to open"
        }
      },
      required: ["path"]
    },
    execute: async ({ path }) => {
      const nextPath = typeof path === "string" ? path : "/";
      window.location.assign(nextPath);
      return { ok: true, path: nextPath };
    }
  },
  {
    name: "list_services",
    description: "List TMC Tech Solutions services available on this page.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {}
    },
    execute: async () =>
      services.map((service) => ({
        slug: service.slug,
        title: service.title,
        description: service.description
      }))
  },
  {
    name: "get_company_info",
    description: "Return company name, tagline, mission, and contact email.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {}
    },
    execute: async () => ({
      name: company.name,
      tagline: company.tagline,
      mission: company.mission,
      email: company.email,
      location: company.location
    })
  },
  {
    name: "start_contact",
    description: "Open the contact form so a visitor can send a project brief.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {}
    },
    execute: async () => {
      window.location.assign("/contact");
      return { ok: true, path: "/contact" };
    }
  }
];

export function WebMcpProvider() {
  useEffect(() => {
    const modelContext = navigator.modelContext;
    if (!modelContext) {
      return;
    }

    const api: ModelContext = modelContext;
    const cleanups: Array<() => void> = [];

    async function register() {
      if (typeof api.provideContext === "function") {
        await api.provideContext({ tools });
      }

      if (typeof api.registerTool === "function") {
        for (const tool of tools) {
          const maybeCleanup = await api.registerTool(tool);
          if (typeof maybeCleanup === "function") {
            cleanups.push(maybeCleanup);
          }
        }
      }
    }

    void register();

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}

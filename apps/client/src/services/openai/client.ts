import { t } from "@lingui/macro";
import { OpenAI } from "openai";
import { useOpenAiStore } from "@/client/stores/openai";

// Helper to detect OpenWebUI base URL (you may want to use a more robust check)
function isOpenWebUI(baseURL: string | undefined) {
  return baseURL?.includes("openwebui") || baseURL?.includes("/api/generate");
}

export const openai = () => {
  const { apiKey, baseURL } = useOpenAiStore.getState();

  if (!apiKey) {
    throw new Error(
      t`Your OpenAI API Key has not been set yet. Please go to your account settings to enable OpenAI Integration.`,
    );
  }

  if (baseURL && isOpenWebUI(baseURL)) {
    // Custom client for OpenWebUI
    return {
      chat: {
        completions: {
          create: async (params: any) => {
            // Map OpenAI params to OpenWebUI format if needed
            const response = await fetch(`${baseURL}/api/generate`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                // Map fields from OpenAI to OpenWebUI as needed
                prompt: params.messages.map((msg: any) => msg.content).join("\n"),
                // ...other required mappings
              }),
            });
            if (!response.ok) throw new Error(await response.text());
            const data = await response.json();
            // Map OpenWebUI response to expected OpenAI format if needed
            return {
              choices: [
                { message: { content: data.result || data.text } }
              ]
            };
          }
        }
      }
    };
  }

  // Default: OpenAI or compatible endpoint
  return new OpenAI({
    apiKey,
    baseURL,
    dangerouslyAllowBrowser: true,
  });
};
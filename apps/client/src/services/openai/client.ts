import { t } from "@lingui/macro";
import { OpenAI } from "openai";
import { useOpenAiStore } from "@/client/stores/openai";

/**
 * Detect if the baseURL is likely for OpenWebUI.
 * Adjust this logic if your OpenWebUI baseURL pattern is different.
 */
function isOpenWebUI(baseURL?: string): boolean {
  // Heuristic: OpenWebUI docs use /api/generate and often run on localhost:8080 or similar.
  // You can refine the detection as needed.
  if (!baseURL) return false;
  return (
    baseURL.includes("openwebui") ||
    baseURL.endsWith("/api") ||
    baseURL.includes("/api/generate") ||
    baseURL.includes("localhost:8080") // Add other conditions as needed
  );
}

/**
 * Custom client for OpenWebUI compatibility.
 * Maps OpenAI `chat.completions.create()` to an OpenWebUI `/api/generate` call.
 */
const openWebUIClient = (baseURL: string, apiKey?: string) => ({
  chat: {
    completions: {
      create: async (params: any) => {
        // Map OpenAI params to OpenWebUI format.
        // Adjust the mapping below to match your OpenWebUI API spec.
        const prompt = params.messages
          .map((m: any) => m.content)
          .join("\n");
        const body = {
          prompt,
          // You may want to map additional options as required by OpenWebUI.
          // For example: model, max_tokens, temperature, etc.
          ...(params.model && { model: params.model }),
          ...(params.max_tokens && { max_tokens: params.max_tokens }),
          ...(params.temperature && { temperature: params.temperature }),
        };

        const response = await fetch(
          `${baseURL.replace(/\/$/, "")}/api/generate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(apiKey && { Authorization: `Bearer ${apiKey}` }),
            },
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();

        // Map OpenWebUI response to OpenAI-like response structure
        // Adjust the mapping as needed to fit your application's expectations.
        return {
          choices: [
            {
              message: {
                content: data.result || data.text || "", // Adjust if OpenWebUI uses a different field
              },
            },
          ],
        };
      },
    },
  },
});

/**
 * Main OpenAI client factory.
 * Uses OpenAI SDK when possible, falls back to OpenWebUI compatibility mode if detected.
 */
export const openai = () => {
  const { apiKey, baseURL } = useOpenAiStore.getState();

  if (!apiKey) {
    throw new Error(
      t`Your OpenAI API Key has not been set yet. Please go to your account settings to enable OpenAI Integration.`,
    );
  }

  if (baseURL && isOpenWebUI(baseURL)) {
    return openWebUIClient(baseURL, apiKey);
  }

  if (baseURL) {
    return new OpenAI({
      apiKey,
      baseURL,
      dangerouslyAllowBrowser: true,
    });
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};
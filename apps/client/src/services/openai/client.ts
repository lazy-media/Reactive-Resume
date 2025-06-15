import { t } from "@lingui/macro";
import { OpenAI } from "openai";

import { useOpenAiStore } from "@/client/stores/openai";

export const openai = () => {
  const { apiKey, baseURL } = useOpenAiStore.getState();

  if (!apiKey) {
    throw new Error(
      t`Your OpenAI API Key has not been set yet. Please go to your account settings to enable OpenAI Integration.`,
    );
  }

  let endpoint = "/chat/completions"; // Default to OpenAI endpoint
  if (baseURL && baseURL.includes("localhost:11434")) {
    endpoint = "/api/generate"; // Use OpenWebUI endpoint for local integration
  }

  if (baseURL) {
    return new OpenAI({
      apiKey,
      baseURL,
      endpoint, // Dynamically set endpoint based on baseURL
      dangerouslyAllowBrowser: true,
    });
  }

  return new OpenAI({
    apiKey,
    endpoint, // Default endpoint
    dangerouslyAllowBrowser: true,
  });
};
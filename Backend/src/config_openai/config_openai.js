import Configuration from "openai";

export const configureOpenAI = () => {
   const config = new Configuration({
      apiKey: "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",
      organization: "  org-JVbtUC0aPI13r7fbTcp4xhJ8",
   });
   return config;
};

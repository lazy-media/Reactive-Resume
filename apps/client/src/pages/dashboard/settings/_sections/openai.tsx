/*...*/
  const onRemove = () => {
    setApiKey(null);
    setBaseURL(null);
    setModel(DEFAULT_MODEL);
    setMaxTokens(DEFAULT_MAX_TOKENS);
    form.reset({ apiKey: "", baseURL: "", model: DEFAULT_MODEL, maxTokens: DEFAULT_MAX_TOKENS });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`OpenAI/Ollama Integration`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`You can make use of the OpenAI API to help you generate content, or improve your writing while composing your resume.`}
        </p>
      </div>

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          <Trans>
            You have the option to{" "}
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/"
            >
              obtain your own OpenAI API key
            </a>
            . This key empowers you to leverage the API as you see fit. Alternatively, if you wish
            to disable the AI features in Reactive Resume altogether, you can simply remove the key
            from your settings.
          </Trans>
        </p>

        <p>
          <Trans>
            You can also integrate with Ollama simply by setting the API key to
            `sk-1234567890abcdef` and the Base URL to your Ollama URL, i.e.
            `http://localhost:11434/v1`. You can also pick and choose models and set the max tokens
            as per your preference.
          </Trans>
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-6 sm:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="apiKey"
            control={form.control}
            /*...*/</form>
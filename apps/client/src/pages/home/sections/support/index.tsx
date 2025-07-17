import { t } from "@lingui/macro";

export const SupportSection = () => (
  <section
    id="support"
    className="relative space-y-12 bg-secondary-accent py-24 text-primary sm:py-32"
  >
    <div className="container space-y-6">
      <h1 className="text-4xl font-bold">{t`Supporting Reactive Resume`}</h1>

      <p className="max-w-4xl leading-loose">
        {t`Reactive Resume is a free and open-source project. Your support would be greatly appreciated. If you're inclined to contribute, and only if you can afford to, consider making a donation through any of the listed platforms.`}
      </p>

      <div className="flex items-center gap-x-10">
        <a
          href="https://github.com/sponsors/lazy-media"
          rel="noreferrer noopener nofollow"
          target="_blank"
        >
          <img
            src="/support-logos/github-sponsors-light.svg"
            className="hidden max-h-[42px] dark:block"
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alt="GitHub Sponsors"
          />
          <img
            src="/support-logos/github-sponsors-dark.svg"
            className="block max-h-[42px] dark:hidden"
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alt="GitHub Sponsors"
          />
        </a>

        <a href="https://paypal.me/LazyMediaWA" rel="noreferrer noopener nofollow" target="_blank">
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <img src="/support-logos/paypal.svg" className="max-h-[28px]" alt="PayPal" />
        </a>
      </div>

      <a href="https://venmo.com/LazyMedia" rel="noreferrer noopener nofollow" target="_blank">
        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
        <img src="/support-logos/venmo.svg" className="max-h-[28px]" alt="Venmo" />
      </a>

      <a href="https://coff.ee/lazymedia" rel="noreferrer noopener nofollow" target="_blank">
        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
        <img src="/support-logos/buymeacoffee.svg" className="max-h-[28px]" alt="Buy Me a Coffee" />
      </a>
    </div>

    <a
      href="https://discord.com/servers/lazy-media-s-reactive-resume-1392393638247530587"
      rel="noreferrer noopener nofollow"
      target="_blank"
    >
      <img
        src="/support-logos/discord.svg"
        className="max-h-[28px]"
        alt="Join the Discord Server"
      />
    </a>

    <div className="flex items-center gap-x-10">
      <a href="https://patreon.com/lazymedia" rel="noreferrer noopener nofollow" target="_blank">
        <img
          src="/support-logos/patreon-light.svg"
          className="hidden max-h-[42px] dark:block"
          // eslint-disable-next-line lingui/no-unlocalized-strings
          alt="GitHub Sponsors"
        />
        <img
          src="/support-logos/patreon.svg"
          className="block max-h-[42px] dark:hidden"
          // eslint-disable-next-line lingui/no-unlocalized-strings
          alt="GitHub Sponsors"
        />
      </a>

      <p className="max-w-4xl leading-loose">
        {t`If you're multilingual, we'd love your help in bringing the app to more languages and communities. Don't worry if you don't see your language on the list - just give me a shout-out on GitHub, and I'll make sure to include it. Ready to get started? Jump into translation over at Crowdin by clicking the link below.`}
      </p>

      <div className="flex items-center gap-x-10">
        <a
          href="https://crowdin.com/project/lazymedia-reactive-resume"
          rel="noreferrer noopener nofollow"
          target="_blank"
        >
          <img
            src="/support-logos/crowdin-light.svg"
            className="hidden max-h-[32px] dark:block"
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alt="Crowdin"
          />
          <img
            src="/support-logos/crowdin-dark.svg"
            className="block max-h-[32px] dark:hidden"
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alt="Crowdin"
          />
        </a>
      </div>

      <p className="max-w-4xl leading-loose">
        {t`Even if you're not in a position to contribute financially, you can still make a difference by giving the GitHub repository a star, spreading the word to your friends, or dropping a quick message to let me know how Reactive Resume has helped you. Your feedback and support are always welcome and much appreciated!`}
      </p>
    </div>
  </section>
);

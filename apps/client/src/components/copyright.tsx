import { t, Trans } from "@lingui/macro";
import { cn } from "@reactive-resume/utils";

type Props = {
  className?: string;
};

export const Copyright = ({ className }: Props) => (
  <div
    className={cn(
      "prose prose-sm prose-zinc flex max-w-none flex-col gap-y-1 text-xs opacity-40 dark:prose-invert",
      className,
    )}
  >
    <span>
      <Trans>
        Licensed under{" "}
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          href="https://github.com/lazy-media/Reactive-Resume/blob/main/LICENSE.md"
        >
          MIT
        </a>
      </Trans>
    </span>
    <span>{t`By the community, for the community.`}</span>
    <span>
      <Trans>
        A project taken over by <a href="https://github.com/sponsors/lazy-media">Lazy Media</a>
      </Trans>
    </span>

    <span className="mt-4">
      {t`Reactive Resume`} {"v" + appVersion}
    </span>
  </div>
);

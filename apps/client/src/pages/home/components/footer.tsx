import { t } from "@lingui/macro";
import { Separator } from "@reactive-resume/ui";
import { Link } from "react-router";

import { Copyright } from "@/client/components/copyright";
import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";

export const Footer = () => (
  <footer className="bg-background">
    <Separator />

    <div className="container grid py-12 sm:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col gap-y-2">
        <Logo size={96} className="-ml-2" />

        <h2 className="text-xl font-medium">{t`Reactive Resume`}</h2>

        <p className="prose prose-sm prose-zinc leading-relaxed opacity-60 dark:prose-invert">
          {t`A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume.`}
        </p>

        <Copyright className="mt-6" />
      </div>

      <div className="relative col-start-4 flex flex-col items-end justify-end">
        <div className="mb-14 space-y-6 text-right">
          <a
            className="block"
            href="https://www.oracle.com/cloud/free/"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <img
              src="/support-logos/powered-by-oracle.avif"
              alt="Powered by Oracle Cloud"
              className="block dark:block"
              width="150px"
            />
          </a>

          <Link
            to="https://docs.rxresume.org/meta/privacy-policy"
            className="block text-sm font-medium"
            target="_blank"
          >{t`Privacy Policy`}</Link>
        </div>

        <div className="absolute bottom-0 right-0 lg:space-x-2">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  </footer>
);

import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultExperience, experienceSchema } from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = experienceSchema;

type FormValues = z.infer<typeof formSchema>;

export const ExperienceDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultExperience,
    resolver: zodResolver(formSchema),
  });
  const MAX_DESCRIPTION_LENGTH = 50;

  return (
    <SectionDialog<FormValues> id="experience" form={form} defaultValues={defaultExperience}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Company`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="typeOfEmployment"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Type of Employment`}</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t`Select Type of Employment`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="n/a">{t`N/A`}</SelectItem>
                    <SelectItem value="Full-Time">{t`Full-time`}</SelectItem>
                    <SelectItem value="Part-Time">{t`Part-time`}</SelectItem>
                    <SelectItem value="Contract">{t`Contract`}</SelectItem>
                    <SelectItem value="Internship">{t`Internship`}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Position",
                  context: "Position held at a company, for example, Software Engineer",
                })}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Date or Date Range`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t`March 2023 - Present`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Location`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="companyDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex w-full items-center justify-between">
                  <span>{t`Company Description`}</span>
                  <span className="text-muted-foreground text-sm">
                    {field.value?.length ?? 0}/{MAX_DESCRIPTION_LENGTH}
                  </span>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
              <FormControl>
                <URLInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
                  footer={(editor) => (
                    <AiActions
                      value={editor.getText()}
                      onChange={(value) => {
                        editor.commands.setContent(value, true);
                        field.onChange(value);
                      }}
                    />
                  )}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};

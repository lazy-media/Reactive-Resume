import fs from "fs";
import path from "path";
import polib from "polib";
import { execSync } from "child_process";

// 1. List all locales in the locales directory
const localesDir = path.resolve(process.cwd(), "apps/client/src/locales");

const locales = fs
  .readdirSync(localesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

// 2. For each locale, process its messages.po file
for (const locale of locales) {
  const poPath = path.join(localesDir, locale, "messages.po");
  if (!fs.existsSync(poPath)) continue;

  // Only operate on files with "Language-Team: <language>" set
  const po = polib.read(poPath);
  const languageTeam = po.metadata["Language-Team"];
  if (!languageTeam) continue;

  let updated = false;

  for (const entry of po) {
    // If already translated, skip
    if (entry.msgstr && entry.msgstr.trim() !== "") continue;

    // Use Whisper AI to translate (simulate with a stub for production, replace with a real call)
    // For demonstration, use a shell call to 'python' whisper_translate.py (to be implemented in python)
    const translation = getAITranslation(entry.msgid, locale);

    if (translation) {
      entry.msgstr = translation;
      updated = true;
    }
  }

  if (updated) {
    po.save(poPath);
    console.log(`Updated ${poPath}`);
  }
}

/**
 * Calls a local Python script that wraps Whisper and returns a translation.
 * For production, you should implement actual Whisper translation for text,
 * but here we mock the behavior for safety.
 */
function getAITranslation(msgid: string, locale: string): string {
  try {
    // Production: Replace with a call to your local whisper translation script
    // Example: python scripts/whisper_translate.py --text "Hello" --lang "el"
    const command = `python scripts/whisper_translate.py --text "${msgid.replace(/"/g, '\\"')}" --lang "${locale}"`;
    const result = execSync(command, { encoding: "utf8" }).trim();
    return result;
  } catch (e) {
    console.warn(`Failed to translate "${msgid}" for locale "${locale}":`, e);
    return "";
  }
}

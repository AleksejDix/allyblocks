import { useState, useEffect, useId } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/molecules/DropdownMenu";
import { LanguagesIcon } from "lucide-react";
import { Label } from "@/components/atoms/Label";

// Import local translation files
import translationEN from "./locales/en/language-switcher.json";
import translationDE from "./locales/de/language-switcher.json";
import translationFR from "./locales/fr/language-switcher.json";
import translationIT from "./locales/it/language-switcher.json";

// Local translation hook
const useLocalTranslation = () => {
  const { t, i18n } = useTranslation("language-switcher");

  useEffect(() => {
    i18n.addResourceBundle("en", "language-switcher", translationEN);
    i18n.addResourceBundle("de", "language-switcher", translationDE);
    i18n.addResourceBundle("fr", "language-switcher", translationFR);
    i18n.addResourceBundle("it", "language-switcher", translationIT);
  }, [i18n]);

  return { t, i18n };
};

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

export function LanguageMenu() {
  const { t, i18n } = useLocalTranslation();
  const [currentLanguageCode, setCurrentLanguageCode] = useState(i18n.language);
  const triggerId = useId();

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguageCode(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = LANGUAGES.find(
    (lang) => lang.code === currentLanguageCode,
  )?.name;

  return (
    <>
      <Label htmlFor={triggerId} className="sr-only">
        {t("language_switcher_trigger_label", { language: currentLanguage })}
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            id={triggerId}
            aria-label={t("language_switcher_trigger_label", {
              language: currentLanguage,
            })}
          >
            <LanguagesIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[180px]">
          <DropdownMenuLabel>{t("select_language_label")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={currentLanguageCode}
            onValueChange={handleLanguageChange}
            aria-labelledby={triggerId}
          >
            {LANGUAGES.map((language) => (
              <DropdownMenuRadioItem
                key={language.code}
                value={language.code}
                aria-label={t("change_language_to", {
                  language: language.name,
                })}
                lang={language.code}
                className="flex items-center gap-2 justify-between cursor-pointer"
              >
                {language.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

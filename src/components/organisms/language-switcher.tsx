import { useState, useEffect, useId } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";

// Import local translation files
import translationEN from "./locales/en/language-switcher.json";
import translationDE from "./locales/de/language-switcher.json";
import translationFR from "./locales/fr/language-switcher.json";
import translationIT from "./locales/it/language-switcher.json";
import { Label } from "../ui/label";

// Local translation hook
export function useLocalTranslation(namespace: string) {
  const { i18n } = useTranslation();

  i18n.addResourceBundle("de", namespace, translationDE, true, true);
  i18n.addResourceBundle("en", namespace, translationEN, true, true);
  i18n.addResourceBundle("fr", namespace, translationFR, true, true);
  i18n.addResourceBundle("it", namespace, translationIT, true, true);

  return useTranslation(namespace);
}

interface LanguageOption {
  code: string;
  name: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

const NAMESPACE = "language-switcher";

export function LanguageSwitcher() {
  const { i18n, t } = useLocalTranslation(NAMESPACE);
  const [currentLanguageCode, setCurrentLanguageCode] = useState(i18n.language);
  const triggerId = useId();

  useEffect(() => {
    setCurrentLanguageCode(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === currentLanguageCode) || LANGUAGES[1];

  return (
    <>
      <Label>{t("select_language_label")}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            id={triggerId}
            lang={currentLanguage.code}
            aria-label={t("language_switcher_trigger_label", {
              language: currentLanguage.name,
            })}
            className="flex items-center gap-2 min-w-[100px] justify-start text-left"
          >
            <LanguagesIcon className="size-4 shrink-0" aria-hidden="true" />
            <span
              className="text-sm font-medium truncate"
              lang={currentLanguage.code}
            >
              {currentLanguage.name}
            </span>
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

export default LanguageSwitcher;

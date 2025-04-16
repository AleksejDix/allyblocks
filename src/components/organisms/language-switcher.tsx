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
import { VisuallyHidden } from "../ui/visually-hidden";
import { LanguagesIcon } from "lucide-react";

// Import local translation files
import translationEN from "./locales/en/language-switcher.json";
import translationDE from "./locales/de/language-switcher.json";
import translationFR from "./locales/fr/language-switcher.json";
import translationIT from "./locales/it/language-switcher.json";

// Local translation hook
export function useLocalTranslation(namespace: string) {
  const { i18n } = useTranslation();

  // Always load German translations synchronously
  if (!i18n.hasResourceBundle("de", namespace)) {
    i18n.addResourceBundle("de", namespace, translationDE, true, true);

    // Preload other languages in the background
    i18n.loadResources();
  }

  // Lazy load other languages to ensure they're eventually added
  useEffect(() => {
    // Load English
    if (!i18n.hasResourceBundle("en", namespace)) {
      i18n.addResourceBundle("en", namespace, translationEN, true, true);
    }
    // Load French
    if (!i18n.hasResourceBundle("fr", namespace)) {
      i18n.addResourceBundle("fr", namespace, translationFR, true, true);
    }
    // Load Italian
    if (!i18n.hasResourceBundle("it", namespace)) {
      i18n.addResourceBundle("it", namespace, translationIT, true, true);
    }
  }, [i18n, namespace]);

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

const NAMESPACE = "language-switcher"; // Define namespace constant

export function LanguageSwitcher() {
  // Use the local translation hook with the specific namespace
  const { i18n, t } = useLocalTranslation(NAMESPACE);
  const [currentLanguageCode, setCurrentLanguageCode] = useState(i18n.language);
  const [liveRegionText, setLiveRegionText] = useState("");
  const triggerId = useId();

  useEffect(() => {
    // Ensure the component reflects the current i18n language
    setCurrentLanguageCode(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    // No need to call setCurrentLanguageCode here, the useEffect above handles it
    const newLang = LANGUAGES.find((lang) => lang.code === languageCode);
    // Use interpolation with the translation key
    setLiveRegionText(
      t("language_selected_announcement", {
        language: newLang?.name || languageCode,
      })
    );
  };

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === currentLanguageCode) || LANGUAGES[1]; // Default to English if current not found

  return (
    <>
      {t("select_language_label")}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            id={triggerId}
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
      <VisuallyHidden aria-live="polite" aria-atomic="true">
        {liveRegionText}
      </VisuallyHidden>
    </>
  );
}

export default LanguageSwitcher;

import React, { useCallback } from "react";
import { useTranslate } from "../hooks/useTranslate";

const Locale: React.FC = () => {
  const { locale, setLocale } = useTranslate();
  const callbacks = {
    onChangeLang: useCallback((e: any) => setLocale(e.target.value), [setLocale]),
  };

  return (
    <select name="lang" id="lang" onChange={callbacks.onChangeLang} value={locale}>
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
};

export default React.memo(Locale);

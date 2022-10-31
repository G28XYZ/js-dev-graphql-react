import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { SET_LOCALE } from "../gql/mutation";
import { GET_LOCALE } from "../gql/query";

const Locale: React.FC<any> = () => {
  const [lang, setLang] = useState("ru");

  useQuery(GET_LOCALE, {
    onCompleted(data) {
      if (data.me.locale) setLang(data.me.locale);
    },
  });
  const [setLocale] = useMutation(SET_LOCALE, {
    refetchQueries: [{ query: GET_LOCALE }],
  });
  const callbacks = {
    onChangeLang: useCallback(
      (e: any) => {
        setLang(e.target.value);
        setLocale({ variables: { locale: e.target.value } });
      },
      [setLang, setLocale]
    ),
  };
  return (
    <select name="lang" id="lang" onChange={callbacks.onChangeLang} value={lang}>
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
};

export default React.memo(Locale);

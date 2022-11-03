import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { SET_LOCALE } from "../gql/mutation";
import { GET_LOCALE } from "../gql/query";
import { en, ru } from "../locale";

export const localize: Record<string, any> = {
  en,
  ru,
};

export const LOCALE = gql`
  {
    lang @client
  }
`;
export const useTranslate = () => {
  const [locale, setLang] = useState("ru");

  const { client } = useQuery(LOCALE);

  client.cache.writeQuery({ query: LOCALE, data: { lang: localize[locale] } });

  useQuery(GET_LOCALE, {
    onCompleted(data) {
      if (data.me.locale) setLang(data.me.locale);
    },
  });

  const [setLocale] = useMutation(SET_LOCALE, {
    refetchQueries: [{ query: GET_LOCALE }],
  });

  return {
    locale,
    lang: localize[locale],
    setLocale: (locale: string) => setLocale({ variables: { locale } }),
  };
};

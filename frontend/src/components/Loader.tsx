import { useTranslate } from "../hooks/useTranslate";
import loadingGif from "../img/loading.gif";
import { IconImage } from "./Error";

export const Loader = () => {
  const { lang } = useTranslate();
  return (
    <div style={{ textAlign: "center" }}>
      <IconImage src={loadingGif} alt="loading" />
      <div>{lang.common.loading}</div>
    </div>
  );
};

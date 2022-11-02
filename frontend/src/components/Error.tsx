import React from "react";
import errorImg from "../img/error-message.png";
import styled from "styled-components";
import { useTranslate } from "../hooks/useTranslate";

export const IconImage = styled.img`
  width: 60px;
  height: 60px;
`;

interface ErrorProps {
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  const { lang } = useTranslate();

  return (
    <div style={{ textAlign: "center" }}>
      <IconImage src={errorImg} />
      <div>{message || lang.common.error}</div>
    </div>
  );
};

import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { LOCALE } from "../../hooks/useTranslate";
import Button from "../Button";
const Wrapper = styled.div`
  height: 100%;
`;
const Form = styled.form`
  height: 100%;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;
const NoteForm: React.FC<any> = (props) => {
  const {
    data: { lang },
  } = useQuery(LOCALE);
  const [value, setValue] = useState({ content: props.content || "" });
  const onChange = (event: any) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          props.action({
            variables: {
              ...value,
            },
          });
        }}
      >
        <TextArea required name="content" placeholder={lang.note.textAreaPlaceholder} value={value.content} onChange={onChange} />
        <Button type="submit">{lang.note.saveButton}</Button>
      </Form>
    </Wrapper>
  );
};
export default NoteForm;

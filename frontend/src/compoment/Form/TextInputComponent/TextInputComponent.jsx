import React from "react";
import { FormControl, FormGroup, FormLabel, FormText } from "react-bootstrap";

const TextInputComponent = ({ field, ...props }) => {
  const {
    errorMessage,
    touched,
    label,
    id,
    value,
    asType,
    placeholder,
  } = props;
  const { name, onChange, onBlur } = field;

  return (
    <FormGroup controlId={id}>
      <FormLabel>{label}</FormLabel>
      <FormControl
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        as={asType ? asType : "input"}
        rows={asType === "textarea" ? 3 : ""}
        style={{ resize: "none" }}
      />
      <FormText className="text-danger">
        {touched && errorMessage ? errorMessage : ""}
      </FormText>
    </FormGroup>
  );
};

export default TextInputComponent;

import React from "react";
import { FormGroup, FormLabel, FormText } from "react-bootstrap";
import Select from "react-select";

const SelectComponent = ({ field, ...props }) => {
  const {
    errorMessage,
    label,
    id,
    fmOptionsType,
    placeholder,
    setFieldValue,
    touched,
    value,
    setFieldTouched,
  } = props;

  console.log(props);

  const { name, handleChange } = field;

  // const handleChange = (option) => {
  //   if (option) {
  //     setFieldValue(name, option.value);
  //   } else setFieldValue(name, "");
  // };

  return (
    <FormGroup controlId={id}>
      <FormLabel>{label}</FormLabel>
      <Select
        name={name}
        placeholder={placeholder}
        options={fmOptionsType}
        onChange={(selectedOption) => {
          handleChange(name)(selectedOption);
        }}
        onBlur={() => setFieldTouched(name, true)}
        isClearable={true}
        value={value}
      />
      <FormText className="text-danger">
        {touched && errorMessage ? errorMessage : ""}
      </FormText>
    </FormGroup>
  );
};

export default SelectComponent;

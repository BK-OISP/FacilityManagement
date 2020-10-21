import React from "react";
import { DatePicker, Form, Input, TimePicker, Select, InputNumber } from "antd";

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField = (AntComponent) => {
  return ({
    field,
    form,
    hasFeedback,
    label,
    selectOptions,
    submitCount,
    type,
    ...props
  }) => {
    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;

    const onInputChange = ({ target: { value } }) => {
      form.setFieldValue(field.name, value);
      console.log(form);
      console.log(field);
    };

    const onChange = (value) => form.setFieldValue(field.name, value);

    const onBlur = () => form.setFieldTouched(field.name, true);

    const AntStyle = (type) => {
      //default is input and select form
      const style = (
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions &&
            selectOptions.map((name) => <Option key={name}>{name}</Option>)}
        </AntComponent>
      );

      switch (type) {
        case "textarea":
          return (
            <Input.TextArea
              {...field}
              {...props}
              onBlur={onBlur}
              onChange={onInputChange}
            />
          );
        case "number":
          return (
            <InputNumber
              {...field}
              {...props}
              onBlur={onBlur}
              onChange={onChange}
              style={{ width: "100%" }}
            />
          );

        default:
          return style;
      }
    };

    return (
      <div className="field-container">
        <FormItem
          label={label}
          hasFeedback={
            (hasFeedback && submitted) || (hasFeedback && touched)
              ? true
              : false
          }
          help={submittedError || touchedError ? hasError : false}
          validateStatus={submittedError || touchedError ? "error" : "success"}
        >
          {AntStyle(type)}
        </FormItem>
      </div>
    );
  };
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);

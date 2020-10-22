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
            selectOptions.map((name) => (
              <Option key={name._id}>{name.label}</Option>
            ))}
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
              style={{ resize: "none" }}
              rows={5}
              allowClear
            />
          );
        case "number":
          return (
            <InputNumber
              {...field}
              {...props}
              onBlur={onBlur}
              onChange={onChange}
            />
          );

        default:
          return style;
      }
    };

    return (
      <FormItem
        label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
      >
        {AntStyle(type)}
      </FormItem>
    );
  };
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);

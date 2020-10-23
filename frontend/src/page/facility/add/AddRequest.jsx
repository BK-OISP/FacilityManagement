import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Heading from "../../../compoment/Heading/Heading";
import addRequestApi from "../../../helper/axios/facilityApi/addRequest";
import { Row, Col, message, Button } from "antd";
import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";
import ImageUpload from "../../../compoment/ImageMultipleUpload/ImageUpload";
// import SelectComponent from "../../../compoment/Form/SelectCompoment/SelectComponent";

const AddRequest = () => {
  const [fmBigGroupType, setFmBigGroupType] = useState();
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const initForm = {
    fmName: "",
    fmBigGroup: "",
    purpose: "",
    quantity: 1,
    specs: "",
    imgUpload: "",
  };

  const digitsOnly = (value) => /^\d+$/.test(value);

  const validationForm = Yup.object().shape({
    fmName: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    fmBigGroup: Yup.string().min(1).required("Vui lòng chọn thông tin"),
    purpose: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    quantity: Yup.string()
      .min(1)
      .required("Vui lòng nhập thông tin")
      .test("Digits only", "Vui lòng chỉ nhập số", digitsOnly),
  });

  useEffect(() => {
    const fetchFNBigGroup = async () => {
      try {
        const data = await addRequestApi.getAllFMType();
        setFmBigGroupType(data.allType);
      } catch (error) {
        message.error(
          "Something went wrong! Please contact IT Support or try again",
          10
        );
      }
    };
    fetchFNBigGroup();
  }, []);

  const handleSubmitForm = async (values, actions) => {
    actions.setSubmitting(false);
    const formData = new FormData();
    for (let key of Object.keys(files)) {
      formData.append("imgCollection", files[key]);
    }
    formData.append("facilityRequest", JSON.stringify(values));
    try {
      await addRequestApi.postRequest(formData);
      actions.resetForm();
      actions.setSubmitting(false);
      setPreviewURLs([]);
      setFiles([]);
      message.success("Upload Completed", 10);
    } catch (error) {
      message.error(
        "Something went wrong! Please contact IT Support or try again",
        10
      );
    }
  };

  return (
    <>
      <div className="px-1 py-1 fm-rq">
        <Row className="mb-1">
          <Heading title="Thêm đề xuất" />
        </Row>

        <Formik
          initialValues={initForm}
          validationSchema={validationForm}
          onSubmit={handleSubmitForm}
        >
          {({ handleSubmit, submitCount, values }) => {
            return (
              <Form onSubmit={handleSubmit} className="fm-rq__wrapper">
                <Row gutter={[48, 16]}>
                  <Col md={8}>
                    <Field
                      component={CreateAntField}
                      name="fmName"
                      type="text"
                      label="Danh mục đề xuất*"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                  <Col md={8}>
                    <Field
                      component={CreateAntField}
                      name="fmBigGroup"
                      type="select"
                      label="Loại danh mục *"
                      selectOptions={fmBigGroupType}
                      submitCount={submitCount}
                      hasFeedback
                      style={{ minWidth: 150 }}
                    />
                  </Col>
                </Row>
                <Row gutter={[48, 16]}>
                  <Col md={8}>
                    <Field
                      component={CreateAntField}
                      name="purpose"
                      label="Mục đích sử dụng*"
                      type="textarea"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                  <Col md={8}>
                    <Field
                      component={CreateAntField}
                      name="specs"
                      label="Quy cách cấu hình"
                      type="textarea"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                </Row>
                <Row gutter={[48, 16]}>
                  <Col md={8}>
                    <Field
                      component={CreateAntField}
                      name="quantity"
                      label="Số lượng đề xuất *"
                      type="number"
                      submitCount={submitCount}
                      hasFeedback
                      defaultValue={values.quantity}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>

                <ImageUpload
                  files={files}
                  setFiles={setFiles}
                  previewURLs={previewURLs}
                  setPreviewURLs={setPreviewURLs}
                />

                <Row justify="center" style={{ marginTop: "2rem" }}>
                  <Button type="primary" htmlType="submit" className="border">
                    Gửi thông tin
                  </Button>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default AddRequest;

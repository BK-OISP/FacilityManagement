import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

import Heading from "../../../compoment/Heading/Heading";
import TextInputComponent from "../../../compoment/Form/TextInputComponent/TextInputComponent";

import addRequestApi from "../../../helper/axios/facilityApi/addRequest";
import ImageUpload from "../../../compoment/ImageMultipleUpload/ImageUpload";
import SelectComponent from "../../../compoment/Form/SelectCompoment/SelectComponent";

const AddRequest = () => {
  const [fmOptionsType, setOptionsFmType] = useState();
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const initForm = {
    fmName: "",
    fmType: "",
    purpose: "",
    quantity: "",
    specs: "",
    imgUpload: "",
  };

  const digitsOnly = (value) => /^\d+$/.test(value);

  const validationForm = Yup.object().shape({
    fmName: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    fmType: Yup.string().min(1).required("Vui lòng chọn thông tin"),
    purpose: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    quantity: Yup.string()
      .min(1)
      .required("Vui lòng nhập thông tin")
      .test("Digits only", "Vui lòng chỉ nhập số", digitsOnly),
  });

  useEffect(() => {
    const fetchFMType = async () => {
      const data = await addRequestApi.getAllFMType();
      const convertData = data.allType.map((item) => {
        return {
          ...item,
          value: item.name,
          label: item.name,
        };
      });
      setOptionsFmType(convertData);
    };
    fetchFMType();
  }, []);

  const handleSubmit = async (values, actions) => {
    console.log("Submit");
    const formData = new FormData();
    for (let key of Object.keys(files)) {
      console.log(files[key]);
      formData.append("imgCollection", files[key]);
    }
    console.log("vales ssss ", values);
    for (let value of formData.values()) {
      console.log(value);
    }
    // try {
    //   await addRequestApi.postRequest(formData);
    //   actions.resetForm();
    //   actions.setSubmitting(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container fluid>
      <div className="px-3 py-3 fm-rq">
        <Heading title="Thêm đề xuất" />

        <Formik
          initialValues={initForm}
          validationSchema={validationForm}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <Form>
                <Row>
                  <Col lg={4}>
                    <Field
                      id="fmName"
                      name="fmName"
                      label="Tên danh mục đề xuất *"
                      placeholder="Tên danh mục đề xuất"
                      component={TextInputComponent}
                      errorMessage={errors["fmName"]}
                      touched={touched["fmName"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fmName || ""}
                    />
                  </Col>
                  <Col lg={4}>
                    <Field
                      id="fmType"
                      name="fmType"
                      label="Loại danh mục đề xuất *"
                      placeholder="Loại danh mục"
                      component={SelectComponent}
                      errorMessage={errors["fmType"]}
                      touched={touched["fmType"]}
                      setFieldValue={setFieldValue}
                      onBlur={handleBlur}
                      fmOptionsType={fmOptionsType}
                      value={values.fmType || ""}
                      setFieldTouched={setFieldTouched}
                    />
                  </Col>
                  <Col lg={4}>
                    <Field
                      id="quantity"
                      name="quantity"
                      label="Số lượng đề xuất *"
                      placeholder="Số lượng đề xuất"
                      component={TextInputComponent}
                      errorMessage={errors["quantity"]}
                      touched={touched["quantity"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.quantity || ""}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <Field
                      id="purpose"
                      name="purpose"
                      label="Mục đích sử dụng *"
                      placeholder="Mục đích sử dụng"
                      component={TextInputComponent}
                      errorMessage={errors["purpose"]}
                      touched={touched["purpose"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.purpose || ""}
                      asType="textarea"
                    />
                  </Col>
                  <Col lg={4}>
                    <Field
                      id="specs"
                      name="specs"
                      label="Qui cách *"
                      placeholder="Qui cách"
                      component={TextInputComponent}
                      errorMessage={errors["specs"]}
                      touched={touched["specs"]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.specs || ""}
                      asType="textarea"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ImageUpload
                      files={files}
                      setFiles={setFiles}
                      previewURLs={previewURLs}
                      setPreviewURLs={setPreviewURLs}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Button variant="primary" type="submit">
                    Gửi đề xuất
                  </Button>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default AddRequest;

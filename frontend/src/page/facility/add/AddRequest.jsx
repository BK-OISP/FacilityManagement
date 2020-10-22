import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Heading from "../../../compoment/Heading/Heading";
// import TextInputComponent from "../../../compoment/Form/TextInputComponent/TextInputComponent";

import addRequestApi from "../../../helper/axios/facilityApi/addRequest";
import { Row, Col, message } from "antd";
import {
  AntInput,
  AntSelect,
} from "../../../compoment/Form/CreateAntField/CreateAntField";
// import ImageUpload from "../../../compoment/ImageMultipleUpload/ImageUpload";
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
        console.log(data);
      } catch (error) {
        message.error(
          "Something went wrong! Please contact IT Support or try again",
          10
        );
      }
    };
    fetchFNBigGroup();
  }, []);

  const handleSubmitForm = async (props) => {
    console.log(props);
    // actions.setSubmitting(false);
    // const formData = new FormData();
    // for (let key of Object.keys(files)) {
    //   formData.append("imgCollection", files[key]);
    // }
    // formData.append("facilityRequest", JSON.stringify(values));
    // console.log(values);
    // try {
    //   await addRequestApi.postRequest(formData);
    //   actions.resetForm();
    //   actions.setSubmitting(false);
    //   setPreviewURLs([]);
    //   setFiles([]);
    // } catch (error) {
    //   console.log(error);
    // }
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
              <Form onSubmit={handleSubmit}>
                <Row gutter={{ xs: 16, sm: 24, md: 48 }}>
                  <Col md={10}>
                    <Field
                      component={AntInput}
                      name="fmName"
                      type="text"
                      label="Danh mục đề xuất*"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                  <Col md={10}>
                    <Field
                      component={AntSelect}
                      name="fmBigGroup"
                      label="Loại danh mục*"
                      selectOptions={fmBigGroupType}
                      submitCount={submitCount}
                      hasFeedback
                      style={{ minWidth: 100 }}
                    />
                  </Col>
                </Row>
                <Row gutter={{ xs: 16, sm: 24, md: 48 }}>
                  <Col md={10}>
                    <Field
                      component={AntSelect}
                      name="purpose"
                      label="Mục đích sử dụng*"
                      type="textarea"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                  <Col md={10}>
                    <Field
                      component={AntSelect}
                      name="specs"
                      label="Qui cách danh mục"
                      type="textarea"
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <Field
                      component={AntInput}
                      name="quantity"
                      label="Số lượng đề xuất *"
                      type="number"
                      submitCount={submitCount}
                      hasFeedback
                      defaultValue={values.quantity}
                      style={{ minWidth: 100 }}
                    />
                  </Col>
                </Row>
                <div className="submit-container">
                  <button className="ant-btn ant-btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default AddRequest;

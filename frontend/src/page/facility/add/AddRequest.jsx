import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-dropdown-select";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Heading from "../../../compoment/Heading/Heading";
import TextInputComponent from "../../../compoment/TextInputComponent/TextInputComponent";

import addRequestApi from "../../../helper/axios/facilityApi/addRequest";
import ImageUpload from "../../../compoment/ImageMultipleUpload/ImageUpload";
import { Button } from "react-bootstrap";

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

  const validationForm = Yup.object().shape({
    fmName: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    fmType: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    purpose: Yup.string().min(1).required("Vui lòng nhập thông tin"),
    quantity: Yup.string().min(1).required("Vui lòng nhập thông tin"),
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

  const handleSubmit = (values, actions) => {
    console.log("Submit");
    const formData = new FormData();
  };

  const handleInputChange = (event) => {
    console.log(event);
  };

  return (
    <Container fluid>
      <div className="px-3 py-3 fm-rq">
        <Heading title="Thêm đề xuất" />

        <Formik
          initialValues={initForm}
          // validationSchema={validationForm}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => {
            return (
              <Form>
                <Row>
                  <Col md={5}>
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
                </Row>
                <ImageUpload
                  files={files}
                  setFiles={setFiles}
                  previewURLs={previewURLs}
                  setPreviewURLs={setPreviewURLs}
                />
                <Row>
                  <Button variant="primary" type="submit">
                    Gửi đề xuất
                  </Button>
                </Row>
              </Form>
            );
          }}
        </Formik>

        <Row>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos velit
          quas iste quod nulla cupiditate. Nostrum natus iure sed minima
          sapiente quia vel commodi velit? Omnis consequuntur quidem dolore
          commodi.
        </Row>
      </div>
    </Container>
  );
};

export default AddRequest;

// <Select
// id="fm-types"
// options={fmOptionsType}
// clearable={true}
// placeholder="Danh mục tài sản"
// onChange={handleInputChange}
// noDataLabel="Không tìm thấy"
// className="mt-2"
// style={{ marginLeft: "10px" }}
// />

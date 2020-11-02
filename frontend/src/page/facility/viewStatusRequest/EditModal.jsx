import { message, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Form, Formik, Field } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";
import ImageUpload from "../../../compoment/ImageMultipleUpload/ImageUpload";
import requestApi from "../../../helper/axios/facilityApi/requestApi";

const EditModal = (props) => {
  const { setShowEditModal, showEditModal, record, setRecordItem } = props;
  const initForm = {
    fmName: record.fmName,
    fmBigGroup: record.fmBigGroup.label,
    purpose: record.purpose,
    quantity: record.quantity,
    specs: record.specs,
    imgCollection: record.imgCollection,
  };
  const [fmBigGroupType, setFmBigGroupType] = useState();
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState(
    record && record.imgCollection.map((item) => item)
  );
  const formRef = useRef();

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

  const handleCancel = (e) => {
    setShowEditModal(false);
  };

  const handleOk = (ref) => {
    console.log(ref.current.values);
  };

  useEffect(() => {
    const fetchFNBigGroup = async () => {
      try {
        const data = await requestApi.getAllFMType();
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

  return (
    <Modal
      title="Sửa thông tin đề xuất"
      visible={showEditModal}
      onOk={() => handleOk(formRef)}
      onCancel={handleCancel}
      width={960}
      maskClosable={false}
      destroyOnClose
      centered
    >
      <Formik
        initialValues={initForm}
        validationSchema={validationForm}
        innerRef={formRef}
      >
        {({ handleSubmit, submitCount, values }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                component={CreateAntField}
                name="fmName"
                type="text"
                label="Danh mục đề xuất*"
                submitCount={submitCount}
                hasFeedback
              />

              <Field
                component={CreateAntField}
                name="fmBigGroup"
                type="select"
                label="Loại danh mục *"
                selectOptions={fmBigGroupType}
                submitCount={submitCount}
                hasFeedback
                style={{ minWidth: 200 }}
              />

              <Field
                component={CreateAntField}
                name="purpose"
                label="Mục đích sử dụng*"
                type="textarea"
                submitCount={submitCount}
                hasFeedback
              />

              <Field
                component={CreateAntField}
                name="specs"
                label="Quy cách cấu hình"
                type="textarea"
                submitCount={submitCount}
                hasFeedback
              />
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
              <ImageUpload
                files={files}
                setFiles={setFiles}
                previewURLs={previewURLs}
                setPreviewURLs={setPreviewURLs}
              />
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditModal;

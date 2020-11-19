import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Descriptions, Row, Form as AntdForm, Col } from "antd";
import { Field, Formik } from "formik";

import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";

const EditModal = (props) => {
  const { setIsRerender, record, isModalOpen } = props;
  const [totalPrice, setTotalPrice] = useState();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const initForm = {
    fmName: record ? record.fmName : "",
    fmBigGroup: record ? record.fmBigGroup.label : "",
    purpose: record ? record.purpose : "",
    quantity: record ? record.quantity : "",
    specs: record ? record.specs : "",
    imgCollection: record ? record.imgCollection : "",
    unit: record ? record.unit.label : "",
    unitPricePredict: record ? record.unitPricePredict : "",
    note: record ? record.notes : "",
  };

  const handleSubmitForm = () => {};

  return (
    <Modal title="Chi tiết đề xuất" visible={isModalOpen} width={960} centered>
      <Descriptions title="Thông tin người đề xuất" bordered>
        <Descriptions.Item label="Tên nhân viên" span={3}>
          danh mục
        </Descriptions.Item>
        <Descriptions.Item label="Bộ phận" span={3}>
          danh mục
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Nội dung đề xuất" bordered className="mt-1">
        <Descriptions.Item label="Tên danh mục" span={2}>
          danh mục
        </Descriptions.Item>
        <Descriptions.Item label="Loại" span={1}>
          Loại mục
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng" span={2}>
          danh mục
        </Descriptions.Item>
        <Descriptions.Item label="Đơn vị tính">số lượng</Descriptions.Item>
        <Descriptions.Item label="Mục đích" span={3}>
          Mục đích
        </Descriptions.Item>
        <Descriptions.Item label="Hình ảnh (nếu có)" span={3}>
          Hình ảnh
        </Descriptions.Item>
      </Descriptions>
      <Row style={{ fontSize: "16px", fontWeight: "bold" }} className="my-1">
        Phần thông tin bổ sung
      </Row>

      <Formik
        initialValues={initForm}
        onSubmit={handleSubmitForm}
        enableReinitialize={true}
      >
        {(handleSubmit, submitCount, values) => {
          return (
            <AntdForm onFinish={handleSubmit} {...layout}>
              <Row gutter={[48, 16]}>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="unitPricePredict"
                    type="text"
                    label="Đơn giá*"
                    submitCount={submitCount}
                    hasFeedback
                  />
                </Col>
              </Row>
              <Row gutter={[48, 16]}>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="note"
                    type="textarea"
                    label="Quy cách*"
                    submitCount={submitCount}
                    hasFeedback
                  />
                </Col>
              </Row>
            </AntdForm>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditModal;

import React, { useRef, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import {
  Descriptions,
  Row,
  Form as AntdForm,
  Col,
  Button,
  Space,
  Image,
} from "antd";
import { Field, Formik } from "formik";

import CreateAntField from "../../../compoment/Form/CreateAntField/CreateAntField";

const EditModal = (props) => {
  const { setIsRerender, record, isModalOpen, setIsModalOpen } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const formRef = useRef();
  console.log(record);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const initForm = {
    specs: record ? record.specs : "",
    unit: record ? record.unit.label : "",
    unitPricePredict: record ? record.unitPricePredict : "",
    note: record ? record.notes : "",
  };

  const handleTotalPrice = (value) => {
    const total = value * record.quantity;
    setTotalPrice(total);
  };

  const handleSubmitForm = () => {};

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Chi tiết đề xuất"
      visible={isModalOpen}
      width={960}
      centered
      footer={null}
      onCancel={handleClose}
    >
      <Descriptions title="Thông tin người đề xuất" bordered>
        <Descriptions.Item label="Tên nhân viên">
          {record.employeeId.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Bộ phận">
          {record.employeeId.department}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Nội dung đề xuất" bordered className="mt-1">
        <Descriptions.Item label="Tên danh mục">
          {record.fmName}
        </Descriptions.Item>
        <Descriptions.Item label="Loại">
          {record.fmBigGroup.label}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng">
          {record.quantity}
        </Descriptions.Item>
        <Descriptions.Item label="Đơn vị tính">
          {record.unit.label}
        </Descriptions.Item>
        <Descriptions.Item label="Mục đích">{record.purpose}</Descriptions.Item>
        <Descriptions.Item label="Hình ảnh (nếu có)">
          {record.imgCollection.map((item) => (
            <Image
              key={item}
              width={150}
              height={150}
              src={`${process.env.REACT_APP_API_URL}/oisp/${item}`}
            />
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Row style={{ fontSize: "16px", fontWeight: "bold" }} className="my-1">
        Phần thông tin bổ sung
      </Row>

      <Formik
        initialValues={initForm}
        onSubmit={handleSubmitForm}
        enableReinitialize={true}
        // innerRef={formRef}
      >
        {(handleSubmit, submitCount, values) => {
          return (
            <AntdForm onFinish={handleSubmit} {...layout}>
              <Row gutter={[48, 16]}>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="unitPricePredict"
                    type="number"
                    label="Đơn giá (dự kiến)*"
                    submitCount={submitCount}
                    hasFeedback
                    setOtherValue={handleTotalPrice}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Row>
                    <Col span={8} style={{ textAlign: "right" }}>
                      Thành tiền:
                    </Col>
                    <Col offset={1}>
                      <strong>{totalPrice}</strong>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[48, 16]}>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="specs"
                    type="textarea"
                    label="Quy cách*"
                    submitCount={submitCount}
                    hasFeedback
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <Field
                    component={CreateAntField}
                    name="note"
                    type="textarea"
                    label="Ghi chú"
                    submitCount={submitCount}
                    hasFeedback
                  />
                </Col>
              </Row>
              <Row justify="center" className="mb-1">
                <Space>
                  <Button type="primary">Duyệt đề xuất</Button>
                  <Button type="primary" danger>
                    Huỷ đề xuất
                  </Button>
                </Space>
              </Row>
              <Row justify="end" className="justify-content-sm-center">
                <Space>
                  <Button type="primary" className="btn-success">
                    Lưu tạm
                  </Button>
                  <Button>Đóng</Button>
                </Space>
              </Row>
            </AntdForm>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditModal;

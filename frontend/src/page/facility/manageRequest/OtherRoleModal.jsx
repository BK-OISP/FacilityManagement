import { Col, Descriptions, Divider, Image, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useRef } from "react";

import Roles from "../../../helper/config/Roles";
import localStorageService from "../../../helper/localStorage/localStorageService";

const getCurrentRole = () => {
  const userRole = localStorageService.getRole();
  const designRole = [
    Roles.ACCOUNTANT_LEAD,
    Roles.DIRECTOR,
    Roles.FM_ADMIN_LEAD,
    Roles.FM_DEPUTY_HEAD,
  ];
  for (const role of userRole) {
    if (designRole.includes(role)) {
      return role;
    }
  }
};

const getCurrentRoleKey = (role) => {
  switch (role) {
    case Roles.FM_DEPUTY_HEAD:
      return "isDeputyHeadApproval";
    case Roles.FM_FACILITY_TEAM_LEAD:
      return "isFMTeamLeadApproval";
    case Roles.FM_ADMIN_LEAD:
      return "isAccountLeadApproval";
    case Roles.ACCOUNTANT_LEAD:
      return "isAdminLeadApproval";
    case Roles.DIRECTOR:
      return "isDirectorApproval";
    default:
      break;
  }
};

const OtherRoleModal = (props) => {
  const {
    setIsRerender,
    record,
    isOtherModalOpen,
    setIsOtherModalOpen,
  } = props;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  let disabledButton = false;
  const formRef = useRef();
  const roleKey = getCurrentRoleKey(getCurrentRole());

  if (record.status[roleKey] !== null) {
    disabledButton = true;
  }

  console.log(record);

  return (
    <Modal
      title="Chi tiết đề xuất"
      visible={isOtherModalOpen}
      onCancel={() => setIsOtherModalOpen(false)}
      centered
      footer={null}
      width={960}
      destroyOnClose
    >
      <Descriptions title="Thông tin người đề xuất" bordered>
        <Descriptions.Item label="Tên nhân viên">
          {record.employeeId.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Bộ phận">
          {record.employeeId.department}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="center">Thông tin đề xuất</Divider>
      <Row gutter={[48, 16]}>
        <Col xs={24} sm={12}>
          Tên danh mục: {record.fmName}
        </Col>
        <Col xs={24} sm={12}>
          Loại danh mục: {record.fmBigGroup.label}
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col xs={24} sm={12}>
          Số lượng: {record.quantity}
        </Col>
        <Col xs={24} sm={12}>
          Đơn vị tính: {record.unit.label}
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col xs={24}>Mục đích: {record.purpose}</Col>
      </Row>
      <Row gutter={16} justify="center">
        {record.imgCollection.length > 0 &&
          record.imgCollection.map((item) => (
            <Col key={item}>
              <Image
                width={150}
                height={150}
                src={`${process.env.REACT_APP_API_URL}/oisp/${item}`}
              />
            </Col>
          ))}
      </Row>
      <Divider orientation="center">Thông tin bổ sung</Divider>
    </Modal>
  );
};

export default OtherRoleModal;

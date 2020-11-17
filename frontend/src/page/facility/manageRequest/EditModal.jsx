import React from "react";
import Modal from "antd/lib/modal/Modal";
import { Descriptions } from "antd";

const EditModal = (props) => {
  const { setIsRerender, recordItem, isModalOpen } = props;
  return (
    <Modal title="Chi tiết đề xuất" visible={isModalOpen} width={960}>
      <Descriptions title="User Info">
        <Descriptions.Item label="Danh mục đề xuất">danh mục</Descriptions.Item>
        <Descriptions.Item label="Mục đích sử dụng">danh mục</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default EditModal;

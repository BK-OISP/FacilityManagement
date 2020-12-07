import React from "react";
import Modal from "antd/lib/modal/Modal";
import { Button } from "antd";

const ViewModal = (props) => {
  const { setShowViewModal, showViewModal, record } = props;
  return (
    <Modal
      title="Xem đề xuất"
      visible={showViewModal}
      onCancel={() => setShowViewModal(false)}
      centered
      width={960}
      destroyOnClose
      footer={[
        <Button key="back" onClick={() => setShowViewModal(false)}>
          Return
        </Button>,
      ]}
    ></Modal>
  );
};

export default ViewModal;

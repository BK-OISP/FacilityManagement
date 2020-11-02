import Modal from "antd/lib/modal/Modal";
import React from "react";

const EditModal = (props) => {
  const { handleOk, handleCancel, showEditModal, record } = props;

  const initForm = {
    fmName: record.fmName,
    // fmBigGroup: record.fmBigGroup.label,
    purpose: record.purpose,
    quantity: record.quantity,
    specs: record.specs,
    imgUpload: record.imgCollection,
  };

  return (
    <Modal
      title="Sửa thông tin đề xuất"
      visible={showEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={960}
      maskClosable={false}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default EditModal;

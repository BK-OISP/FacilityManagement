import React from "react";
import Modal from "antd/lib/modal/Modal";

const EditModal = (props) => {
  const { setIsRerender, recordItem, isModalOpen } = props;
  return (
    <Modal title="Chi tiết đề xuất" visible={isModalOpen} width={960}></Modal>
  );
};

export default EditModal;

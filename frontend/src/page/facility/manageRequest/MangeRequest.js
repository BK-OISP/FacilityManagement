import React, { useEffect } from "react";
import { Row } from "antd";

import Heading from "../../../compoment/Heading/Heading";
import manageRequest from "../../../helper/axios/facilityApi/manageApi";

const MangeRequest = () => {
  useEffect(() => {
    const getAllRequest = async () => {
      const response = await manageRequest.getAllRequest();
    };
    getAllRequest();
  }, []);

  return (
    <div className="px-1 py-1 table">
      <Row className="mb-1">
        <Heading title="Quản lý đề xuất" />
      </Row>
    </div>
  );
};

export default MangeRequest;

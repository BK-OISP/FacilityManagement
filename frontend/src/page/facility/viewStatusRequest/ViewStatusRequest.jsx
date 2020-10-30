import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Heading from "../../../compoment/Heading/Heading";

import TableCompoment from "./TableCompoment";
import { useEffect } from "react";
import viewRequest from "../../../helper/axios/facilityApi/viewRequest";

const ViewStatusRequest = () => {
  const [isRerender, setIsRerender] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllRequest = async () => {
      try {
        const response = await viewRequest.viewRequestByEmpId();
        console.log(response);
        const dataTable = response.allRequest.map((item, index) => {
          return {
            ...item,
            number: index + 1,
            key: item._id,
            ...item.status,
          };
        });
        setData(dataTable);
      } catch (err) {
        message.error(err.message, 5);
      }
    };
    fetchAllRequest();
  }, [isRerender]);

  return (
    <div className="ad-tab px-1 py-1 table fm-viewall">
      <Row className="mb-1">
        <Heading title="Các đề xuất của bạn" />

        <Col className="ml-auto text-right d-flex align-center">
          <Link to="/facility/add">
            <Button type="primary" icon={<PlusOutlined />} className="border">
              Thêm đề xuất
            </Button>
          </Link>
        </Col>
      </Row>
      <TableCompoment data={data} setIsRerender={setIsRerender} />
      <p style={{ fontStyle: "italic", color: "grey" }}>
        Lưu ý: Bạn chỉ có thể thay đổi / xoá đề xuất trước khi trưởng phòng phê
        duyệt.
      </p>
    </div>
  );
};

export default ViewStatusRequest;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Heading from "../../../compoment/Heading/Heading";

import ViewAllTable from "./ViewAllTable";

const ViewAll = () => {
  const [data, setData] = useState([
    {
      key: "11",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "12",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "13",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "14",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "15",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "16",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "17",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "18",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "19",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "111",
      number: 1,
      fmName: "máy in",
      overallStatus: true,
      deputyHead: true,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },
    {
      key: "21",
      number: 2,
      fmName: "máy inaaa",
      overallStatus: false,
      deputyHead: false,
      facility: true,
      admin: false,
      accountant: false,
      director: false,
    },

    {
      key: "3",
      number: 3,
      fmName: "máy ina",
      overallStatus: false,
      deputyHead: true,
      facility: false,
      admin: false,
      accountant: false,
      director: false,
    },
  ]);

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
      <ViewAllTable data={data} />
    </div>
  );
};

export default ViewAll;

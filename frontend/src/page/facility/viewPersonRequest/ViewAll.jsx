import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Table, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import Heading from "../../../compoment/Heading/Heading";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import Column from "antd/lib/table/Column";
import { useCallback } from "react";

const ViewAll = () => {
  const column = [
    {
      title: "#",
      dataIndex: "no",
      key: "nnumber",
    },
    {
      title: "Danh mục đề xuất",
      dataIndex: "fmName",
      key: "fmName",
    },
    {
      title: "Tiến độ phê duyệt",
      dataIndex: "requestStatus",
      key: "requestStatus",
    },
    {
      title: "Trưởng bộ phận",
      dataIndex: "deputyHead",
      key: "deputyHead",
      render: (isCheck) => (
        <>
          {console.log(isCheck)}
          <p> {isCheck ? "đúng" : "sai"} </p>
        </>
      ),
    },
    {
      title: "Cơ sở vật chất",
      dataIndex: "facility",
      key: "facility",
      render: (isCheck) => <p> {isCheck ? "đúng" : "sai"} </p>,
    },
    {
      title: "Hành chính tổng hợp",
      dataIndex: "admin",
      key: "admin",
      render: (isCheck) => <p> {isCheck ? "đúng" : "sai"} </p>,
    },
    {
      title: "Kế toán",
      dataIndex: "accountant",
      key: "accountant",
      render: (isCheck) => <p> {isCheck ? "đúng" : "sai"} </p>,
    },
    {
      title: "Ban giám đốc",
      dataIndex: "director",
      key: "director",
      render: (isCheck) => <p> {isCheck ? "đúng" : "sai"} </p>,
    },
  ];

  const data = [
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
  ];

  const renderStatus = useCallback((checkingStatus, record, index) => {
    console.log(record, index);

    if (record.overallStatus) {
      //true = dang duyệt
      if (checkingStatus) {
        return <CheckCircleOutlined className="btn-success ant-icon" />;
      } else
        return <ExclamationCircleOutlined className="btn-warning ant-icon" />;
    }
    //reject rồi
    return <CloseCircleOutlined className="btn-danger ant-icon" />;
  }, []);

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
      <Table
        dataSource={data}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
      >
        <Column title="#" dataIndex="number" key="number" width="4%" />
        <Column
          title="Danh mục đề xuất"
          dataIndex="fmName"
          key="fmName"
          width="25%"
        />
        <ColumnGroup title="Tiến độ phê duyệt" width="58%">
          <Column
            title="Trưởng bộ phận"
            dataIndex="deputyHead"
            key="deputyHead"
            render={renderStatus}
          />
          <Column
            title="Cơ sở vật chất"
            dataIndex="facility"
            key="facility"
            render={renderStatus}
            c
          />
          <Column
            title="Hành chính tổng hợp"
            dataIndex="admin"
            key="admin"
            render={renderStatus}
          />
          <Column
            title="Kế toán"
            dataIndex="accountant"
            key="accountant"
            render={renderStatus}
          />
          <Column
            title="Ban Giám đốc"
            dataIndex="director"
            key="director"
            render={renderStatus}
          />
        </ColumnGroup>
        <Column
          title="Thao tác"
          width="15%"
          render={(record) => (
            <Space size="middle">
              {console.log("record", record)}
              <Button
                type="text"
                icon={<EditOutlined className="ant-icon btn-primary" />}
                disabled={record.deputyHead}
              />
              <Button
                type="text"
                icon={<DeleteOutlined className="ant-icon btn-danger" />}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default React.memo(ViewAll);

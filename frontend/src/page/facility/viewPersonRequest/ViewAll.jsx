import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Heading from "../../../compoment/Heading/Heading";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import Column from "antd/lib/table/Column";

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
      deputyHead: false,
      facility: true,
      admin: true,
      accountant: true,
      director: true,
    },
    {
      key: "21",
      number: 2,
      fmName: "máy inaaa",
      deputyHead: true,
      facility: true,
      admin: true,
      accountant: true,
      director: false,
    },
    {
      key: "3",
      number: 3,
      fmName: "máy ina",
      deputyHead: false,
      facility: true,
      admin: false,
      accountant: true,
      director: false,
    },
  ];

  return (
    <>
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
        <Table dataSource={data}>
          <Column title="#" dataIndex="number" key="number" width="2%" />
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
              render={(isCheck) => <>{isCheck ? "đúng" : "sai"}</>}
            />
            <Column
              title="Cơ sở vật chất"
              dataIndex="facility"
              key="facility"
              render={(isCheck) => <>{isCheck ? "đúng" : "sai"}</>}
            />
            <Column
              title="Hành chính tổng hợp"
              dataIndex="admin"
              key="admin"
              render={(isCheck) => <>{isCheck ? "đúng" : "sai"}</>}
            />
            <Column
              title="Kế toán"
              dataIndex="accountant"
              key="accountant"
              render={(isCheck) => <>{isCheck ? "đúng" : "sai"}</>}
            />
            <Column
              title="Ban Giám đốc"
              dataIndex="director"
              key="director"
              render={(isCheck) => <>{isCheck ? "đúng" : "sai"}</>}
            />
          </ColumnGroup>
          <Column
            title="Thao tác"
            width="15%"
            render={() => (
              <>
                <div className="material-icons" style={{ color: "#4834d4" }}>
                  create
                </div>
                <div className="material-icons" style={{ color: "#eb4d4b" }}>
                  delete
                </div>
              </>
            )}
          />
        </Table>

        {/* <table responsive hover bordered sedittyle={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th rowSpan={2} style={{ width: "5%" }}>
                #
              </th>
              <th rowSpan={2} style={{ width: "45%" }}>
                Danh mục đề xuất
              </th>
              <th colSpan={5} style={{ width: "40%" }}>
                Tiến độ phê duyệt
              </th>
              <th rowSpan={2} style={{ width: "10%" }}>
                Thao tác
              </th>
            </tr>
            <tr>
              <th>Trưởng Bộ phận </th>
              <th>Cơ sở vật chất</th>
              <th>Hành chính tổng hợp </th>
              <th>Kế toán</th>
              <th>Ban giám đốc</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <div
                  className="material-icons"
                  style={{ color: "#4834d4", margin: "5px" }}
                >
                  create
                </div>
                <div
                  className="material-icons"
                  style={{ color: "#eb4d4b", margin: "5px" }}
                >
                  delete
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                voluptatem ea aperiam consectetur accusantium suscipit
                perspiciatis inventore non omnis, assumenda repudiandae fugiat,
                sequi deleniti reprehenderit consequatur! Porro sapiente quae
                eum!
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
          </tbody>
  </table> */}
      </div>
    </>
  );
};

export default ViewAll;

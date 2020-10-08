import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Heading from "../../../compoment/Heading/Heading";

const ViewAll = () => {
  return (
    <Container fluid>
      <div className="ad-tab px-3 py-3 tab-view fm-viewall">
        <Row className="pb-3">
          <Heading title="Các đề xuất của bạn" />
          <Col className="ml-auto text-right" style={{ paddingRight: "10px" }}>
            <Link to="/facility/add">
              <Button variant="success">Thêm đề xuất</Button>
            </Link>
          </Col>
        </Row>
        <Table responsive hover bordered sedittyle={{ textAlign: "center" }}>
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
        </Table>
      </div>
    </Container>
  );
};

export default ViewAll;

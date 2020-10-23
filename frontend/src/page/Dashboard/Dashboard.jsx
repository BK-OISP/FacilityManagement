import React from "react";

import { Row, Col } from "antd";

import TodoCard from "../../compoment/card/todocard/TodoCard";

const Dashboard = (props) => {
  return (
    <>
      <Row justify="space-between">
        <TodoCard type="primary" icon="analytics" header="100+" text="Todo" />
        <TodoCard type="success" icon="analytics" header="100+" text="Todo" />
        <TodoCard type="danger" icon="analytics" header="100+" text="Todo" />
        <TodoCard type="warning" icon="analytics" header="100+" text="Todo" />
      </Row>

      <Row className="my-4">
        <Col md={8} style={{ padding: "0" }}>
          <div className="ad-tab px-3 py-3">
            <Row className="pb-3">
              <Col style={{ fontWeight: "bold" }}>Table</Col>
            </Row>
            <table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
                  <th>Table heading</th>
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
                </tr>
                <tr>
                  <td>2</td>
                  <td>Table cell</td>
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
            </table>
          </div>
        </Col>
        <Col md={4}>b</Col>
      </Row>
    </>
  );
};
export default Dashboard;

import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Heading = (props) => {
  const { title } = props;
  return (
    <Row>
      <Col>
        <h4>{title}</h4>
      </Col>
    </Row>
  );
};

export default Heading;
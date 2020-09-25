import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const TodoCard = (props) => {
  const { type, icon, header, text } = props;
  return (
    <Col sm={6} md={3} className={`counter bg-${type} text-center`}>
      <Row>
        <Col>
          <span className="material-icons">{icon}</span>
        </Col>
      </Row>
      <Row className="counter--header">
        <Col>
          <h3>{header}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{text}</p>
        </Col>
      </Row>
    </Col>
  );
};
export default TodoCard;

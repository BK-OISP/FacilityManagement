import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tilt from "react-tilt";

import OISP_Logo from "../../asset/img/OISP_Logo.png";
import GoogleIcon from "./GoogleIcon";

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <Container className="login">
        <Row className="justify-content-between">
          <Col md={5} className="d-none d-md-block login--logo">
            <Tilt className="Tilt" options={{ perspective: 600 }}>
              <img className="img-fluid" src={OISP_Logo} alt="OISP_Logo" />
            </Tilt>
          </Col>
          <Col md={7}>
            <Row className="justify-content-center login--header">
              Sign In With
            </Row>
            <Row className="justify-content-center mt-4">
              <GoogleIcon />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

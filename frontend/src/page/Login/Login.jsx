import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tilt from "react-tilt";

import OISP_Logo from "./OISP_Logo.png";

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <Container className="login">
        <Row className="justify-content-between">
          <Col md={5} className="d-none d-md-block login--logo">
            <Tilt className="Tilt" options={{ max: 25, perspective: 600 }}>
              <img className="img-fluid" src={OISP_Logo} alt="OISP_Logo" />
            </Tilt>
          </Col>
          <Col md={7}>
            <Row className="justify-content-center login--header">
              Sign In With
            </Row>
            <Row className="justify-content-center mt-4">
              <button
                className="btn btn-outline-light login--google "
                id="button"
              >
                <img
                  width="40px"
                  style={{ margin: "10px" }}
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Google
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

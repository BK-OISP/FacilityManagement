import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-dropdown-select";

import addRequestApi from "../../../helper/axios/facilityApi/addRequest";
import Heading from "../../../compoment/Heading/Heading";

const AddRequest = () => {
  const [fmType, setFmType] = useState();

  useEffect(() => {
    const fetchFMType = async () => {
      const data = await addRequestApi.getAllFMType();
      const convertData = data.allType.map((item) => {
        return {
          ...item,
          value: item.name,
          label: item.name,
        };
      });
      setFmType(convertData);
      console.log(data.allType);
    };
    fetchFMType();
  }, []);

  const handleInputChange = (event) => {
    console.log(event);
  };

  return (
    <Container fluid>
      <div className="px-3 py-3 fm-rq">
        <Heading title="Thêm đề xuất" />
        <Row>
          <Col md={4}>
            <Select
              id="check"
              options={fmType}
              clearable={true}
              placeholder="Loại tài sản"
              onChange={handleInputChange}
              noDataLabel="Không tìm thấy"
            />
          </Col>
        </Row>

        <Row>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos velit
          quas iste quod nulla cupiditate. Nostrum natus iure sed minima
          sapiente quia vel commodi velit? Omnis consequuntur quidem dolore
          commodi.
        </Row>
      </div>
    </Container>
  );
};

export default AddRequest;

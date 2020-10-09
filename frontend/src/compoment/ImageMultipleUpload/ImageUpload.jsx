import React, { useRef } from "react";
import { Row } from "react-bootstrap";
import BtnUpload from "./BtnUpload";

const ImageUpload = (props) => {
  // eslint-disable-next-line
  const { files, setFiles, previewURLs, setPreviewURLs } = props;

  const fileUpload = useRef();

  const showFileUpload = () => {
    if (fileUpload) {
      fileUpload.current.click();
    }
  };

  const loadMultipleFiles = (event) => {
    event.preventDefault();

    const fileList = Array.from(event.target.files);
    setFiles(event.target.files);

    const mappedFiles = fileList.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewURLs(mappedFiles);
  };

  return (
    <>
      <Row className="justify-content-center">
        <input
          type="file"
          multiple
          onChange={loadMultipleFiles}
          style={{ display: "none" }}
          ref={fileUpload}
        />
        <BtnUpload handleClick={showFileUpload} />
      </Row>
      <Row className="justify-content-center">
        {previewURLs.length > 0 &&
          previewURLs.map((file) => {
            return (
              <img
                key={file.preview}
                src={file.preview}
                alt={file.preview}
                className="img__preview"
              />
            );
          })}
      </Row>
    </>
  );
};

export default ImageUpload;

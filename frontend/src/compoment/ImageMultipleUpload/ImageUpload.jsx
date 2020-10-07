import React, { useState } from "react";
import { Row } from "react-bootstrap";

const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const loadMultipleFiles = (event) => {
    event.preventDefault();

    const fileList = Array.from(event.target.files);
    setFiles(fileList);

    const mappedFiles = fileList.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewURLs(mappedFiles);
    console.log(previewURLs);
  };

  const uploadFiles = (event) => {
    event.preventDefault();
    console.log(files);
  };

  return (
    <>
      <Row>
        <input
          type="file"
          multiple
          className="form-control"
          onChange={loadMultipleFiles}
        />
      </Row>
      <Row>
        {previewURLs.length > 0 &&
          previewURLs.map((file) => {
            return (
              <img
                key={file.preview}
                src={file.preview}
                alt={file.preview}
                style={{ width: "150px" }}
              />
            );
          })}
      </Row>
    </>
  );
};

export default ImageUpload;

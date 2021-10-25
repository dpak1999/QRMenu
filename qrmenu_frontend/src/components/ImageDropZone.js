/** @format */

import { useState, useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { uploadImage } from '../apis';

const DropZone = styled.div`
  border: 1px dashed #ced4d9;
  border-radius: 5px;
  color: #6c575d;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 142px;
  img {
    height: 140px;
  }
`;

const ImageDropZone = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    uploadImage(acceptedFiles[0])
      .then((json) => onChange(json.url))
      .finally(() => setLoading(false));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <DropZone {...getRootProps()}>
      <input {...getInputProps()} />
      {value ? (
        <img src={value} />
      ) : loading ? (
        <Spinner variant="standard" animation="border" role="status" />
      ) : (
        <span>Drag and drop image here, or click to select file</span>
      )}
    </DropZone>
  );
};

export default ImageDropZone;

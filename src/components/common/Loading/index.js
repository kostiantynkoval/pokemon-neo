import React from 'react';
import {Spinner} from "react-bootstrap";
import './styles.css'

const Loading = () => {
  return (
    <div className="Loading_Spinner">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
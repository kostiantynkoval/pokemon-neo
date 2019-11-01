import React from 'react';
import {Alert} from "react-bootstrap";
import './styles.css'

const ErrorAlert = ({closeAlert}) => {
  return (
    <Alert className="Error_Alert" variant="danger" onClose={closeAlert} dismissible>
      <Alert.Heading>Error while fetching data!</Alert.Heading>
      <p>
        Please, try again later.
      </p>
    </Alert>
  );
};

export default ErrorAlert;
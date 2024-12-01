import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/login");
  };

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back login
        </Button>
      }
    />
  );
};

export default NotAuthorized;

import React from "react";
import { Card } from "antd";

const DashCard = ({ title, value }) => {
  return (
    <Card title={title} bordered={false} style={{ textAlign: "center" }}>
      <h1>{value}</h1>
    </Card>
  );
};

export default DashCard;

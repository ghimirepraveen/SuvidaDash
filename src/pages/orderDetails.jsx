import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import {
  Card,
  Divider,
  Avatar,
  Typography,
  Skeleton,
  Alert,
  Button,
  Row,
  Col,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useOrderDetails } from "../hooks/useOrderData";

const { Title, Text } = Typography;

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useOrderDetails(id);

  if (isLoading) return <Skeleton active />;
  if (isError)
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );

  const order = data.data;

  return (
    <DashboardLayout>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        Back
      </Button>
      <Title level={4}>Order Details</Title>
      <Card>
        <Row gutter={16}>
          <Col span={16}>
            <Title level={4}>{order?.user?.name || "N/A"}</Title>
            <Text>Email: {order?.user?.email || "N/A"}</Text>
            <br />
            <Text>Phone: {order?.user?.phoneNumber || "N/A"}</Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Title level={5}>Service Details</Title>
            <Text>
              Service Provider: {order.service?.serviceprovidername || "N/A"}
            </Text>
            <br />
            <Text>Email: {order.service?.serviceprovideremail || "N/A"}</Text>
            <br />
            <Text>Phone: {order.service?.serviceproviderphone || "N/A"}</Text>
            <br />
            <Text>Price: Rs.{order?.price || "N/A"}</Text>
          </Col>
          <Col span={12}>
            <Title level={5}>order Details</Title>
            <Text>Status: {order?.status || "N/A"}</Text>
            <br />
            <Text>
              Date: {new Date(order?.createdAt).toLocaleString() || "N/A"}
            </Text>
            <br />
            <Text>Location: {order?.location || "N/A"}</Text>
            <br />
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>Organization Details</Title>
            <Text>Name: {order?.org?.nameOrg || "N/A"}</Text>
            <br />
            <Text>Address: {order?.org?.address || "N/A"}</Text>
            <br />
            <Text>Contact Person: {order?.org?.contactPerson || "N/A"}</Text>
            <br />
            <Text>Rating: {order?.org?.rating || "N/A"}</Text>
          </Col>
        </Row>
      </Card>
    </DashboardLayout>
  );
};

export default OrderDetails;

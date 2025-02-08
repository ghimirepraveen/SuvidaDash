import React, { useState } from "react";
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
import { useBookingDetails } from "../hooks/useBookingData";

const { Title, Text } = Typography;

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useBookingDetails(id);

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

  const booking = data.data;

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
      <Title level={4}>Booking Details</Title>
      <Card>
        <Row gutter={16}>
          <Col span={16}>
            <Title level={4}>{booking.user.name}</Title>
            <Text>Email: {booking.user.email}</Text>
            <br />
            <Text>Phone: {booking.user.phoneNumber}</Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Title level={5}>Service Details</Title>
            <Text>Service Provider: {booking.service.serviceprovidername}</Text>
            <br />
            <Text>Email: {booking.service.serviceprovideremail}</Text>
            <br />
            <Text>Phone: {booking.service.serviceproviderphone}</Text>
            <br />
            <Text>Price: Rs.{booking.service.price}</Text>
          </Col>
          <Col span={12}>
            <Title level={5}>Booking Details</Title>
            <Text>Status: {booking.bookingstatus}</Text>
            <br />
            <Text>Date: {new Date(booking.bookingdate).toLocaleString()}</Text>
            <br />
            <Text>Location: {booking.location}</Text>
            <br />
            <Text>Total Price: Rs.{booking.totalprice}</Text>
            <br />
            <Text>Active: {booking.isActive ? "Yes" : "No"}</Text>
            <br />
            <Text>Published: {booking.isPublished ? "Yes" : "No"}</Text>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={24}>
            <Title level={5}>Organization Details</Title>
            <Text>Name: {booking.org.nameOrg}</Text>
            <br />
            <Text>Address: {booking.org.address}</Text>
            <br />
            <Text>Contact Person: {booking.org.contactPerson}</Text>
            <br />
            <Text>Contact Number: {booking.org.contactNumber}</Text>
          </Col>
        </Row>
      </Card>
    </DashboardLayout>
  );
};

export default BookingDetail;

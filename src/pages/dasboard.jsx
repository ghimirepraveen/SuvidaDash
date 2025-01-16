import React from "react";
import { Row, Col } from "antd";
import DashCard from "../components/DashCard";
import {
  DashboardProvider,
  useDashboardContext,
} from "../context/DashboardContext";
import DashboardLayout from "../components/DashboardLayout";

const DashboardContent = () => {
  const { data, isError, error, isLoading } = useDashboardContext();

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const items = [
    { title: "Users", value: data?.data?.user },
    { title: "Organizations", value: data?.data?.org },
    { title: "Admins", value: data?.data?.admin },
    { title: "Services", value: data.data?.service },
    { title: "All Organizations", value: data.data?.orgAll },
    { title: "Approved Organizations", value: data.data?.orgApproved },
    { title: "All Services", value: data.data?.serviceAll },
    { title: "Approved Services", value: data.data?.serviceApproved },
    { title: "All Bookings", value: data.data?.bookingAll },
    { title: "Pending Bookings", value: data.data?.bookingPending },
    { title: "Completed Bookings", value: data.data?.bookingCompleted },
    { title: "All Orders", value: data.data?.orderAll },
    { title: "Accepted Orders", value: data.data?.orderAccepted },
    { title: "Declined Orders", value: data.data?.orderDeclined },
  ];

  return (
    <Row gutter={[16, 16]}>
      {items.map((item, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <DashCard title={item.title} value={item.value} />
        </Col>
      ))}
    </Row>
  );
};

const Dashboard = () => (
  <DashboardProvider>
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  </DashboardProvider>
);

export default Dashboard;

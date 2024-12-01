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
  Space,
  message,
  Modal,
  Input,
} from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import {
  useServiceDetails,
  useUpdateServiceStatus,
  useBlockService,
} from "../hooks/useServiceData";

const { Title, Text } = Typography;

const ServiceDetailsPage = () => {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const {
    data: serviceDetails,
    isLoading,
    isError,
  } = useServiceDetails(serviceId);
  const { mutate } = useUpdateServiceStatus();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate: toggleServiceStatus } = useBlockService();
  const [selectedImage, setSelectedImage] = useState(null);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === "rejected") {
      setShowRejectModal(true);
    } else {
      mutate({ serviceId, status: newStatus, action: "accept" });
    }
  };

  const handleReject = () => {
    mutate({
      serviceId,
      action: "reject",
      message: rejectionMessage,
    });
    setShowRejectModal(false);
    setRejectionMessage("");
  };

  const handleBlockToggle = () => {
    toggleServiceStatus({ serviceId, isBlocked: !isBlocked });
    message.success(
      `Organization ${isBlocked ? "unblocked" : "blocked"} successfully`
    );
  };

  if (isLoading) return <Skeleton active />;
  if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load service details"
        type="error"
        showIcon
      />
    );
  }

  const {
    org,
    service,
    serviceprovidername,
    serviceprovideremail,
    serviceproviderphone,
    description,
    price,
    isActive,
    isBlocked,
    messgae,
    status,
    img,
    rating,
    totalratedby,
    createdAt,
  } = serviceDetails.data || {};

  return (
    <DashboardLayout>
      <div className="service-details-page">
        <div
          className="header mb-4"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowLeftOutlined
            style={{ fontSize: "24px", cursor: "pointer", marginRight: "16px" }}
            onClick={() => navigate(-1)}
          />
          <Title
            level={3}
            style={{
              fontSize: "35px",
              flex: 1,
              textAlign: "center",
              color: "#333",
            }}
          >
            {service?.name}
          </Title>
          {isBlocked ? (
            <Button
              type="primary"
              style={{
                margin: "10px",
                fontSize: "20px",
                width: "150px",
                height: "50px",
                backgroundColor: "green",
                borderColor: "green",
              }}
              onClick={() => handleBlockToggle()}
            >
              Unblock
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              style={{
                margin: "10px",
                fontSize: "20px",
                width: "150px",
                height: "50px",
                backgroundColor: "red",
                borderColor: "red",
              }}
              onClick={() => handleBlockToggle()}
            >
              Block
            </Button>
          )}
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title={<Title level={4}>Service Details</Title>}
              className="shadow-md"
              style={{ fontSize: "18px" }}
            >
              <Text style={{ fontSize: "18px" }}>
                {description || "No description available."}
              </Text>
              <Divider />
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Status:
                </Text>{" "}
                {status || "N/A"}
              </div>
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Message:
                </Text>{" "}
                {messgae || "N/A"}
              </div>
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Organization:
                </Text>{" "}
                {org?.nameorg || "N/A"}
              </div>
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Service Code:
                </Text>{" "}
                {service?.servicecode || "N/A"}
              </div>
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Price:
                </Text>{" "}
                ${price || "N/A"}
              </div>
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Active:
                </Text>{" "}
                {isActive ? "Yes" : "No"}
              </div>
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Blocked:
                </Text>{" "}
                {isBlocked ? "Yes" : "No"}
              </div>
              <div>
                <Text strong style={{ fontSize: "18px" }}>
                  Created At:
                </Text>{" "}
                {new Date(createdAt).toLocaleDateString() || "N/A"}
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              title={<Title level={4}>Service Images</Title>}
              className="shadow-md mb-4"
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                {img?.map((image, index) => (
                  <Avatar
                    key={index}
                    src={`/${image}`}
                    shape="square"
                    size={120}
                    alt={`Service Image ${index + 1}`}
                    onClick={() => handleImageClick(image)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
          <Col xs={24} md={12}>
            <Card
              title={<Title level={4}>Provider Information</Title>}
              className="shadow-md mb-4"
              style={{ fontSize: "20px" }}
            >
              <div>
                <Text style={{ fontSize: "18px" }} strong>
                  Provider Name:
                </Text>{" "}
                {serviceprovidername || "N/A"}
              </div>
              <div>
                <Text style={{ fontSize: "18px" }} strong>
                  Email:
                </Text>{" "}
                {serviceprovideremail || "N/A"}
              </div>
              <div>
                <Text style={{ fontSize: "18px" }} strong>
                  Phone:
                </Text>{" "}
                {serviceproviderphone || "N/A"}
              </div>
              <div>
                <Text style={{ fontSize: "18px" }} strong>
                  Rating:
                </Text>{" "}
                {rating || 0} / 5
              </div>
              <div>
                <Text style={{ fontSize: "18px" }} strong>
                  Rated By:
                </Text>{" "}
                {totalratedby || 0} users
              </div>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card className="shadow-md mb-4" style={{ textAlign: "center" }}>
              <Space size="large">
                <Button
                  type="primary"
                  onClick={() => handleStatusChange("accepted")}
                >
                  Approve
                </Button>

                <Button
                  type="primary"
                  danger
                  onClick={() => handleStatusChange("rejected")}
                >
                  Reject
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={handleModalClose}
          centered
        >
          <img
            src={`/${selectedImage}`}
            alt="Selected"
            style={{ width: "100%" }}
          />
        </Modal>

        <Modal
          title="Reject Service"
          visible={showRejectModal}
          onOk={handleReject}
          onCancel={() => setShowRejectModal(false)}
          okText="Reject"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter rejection reason..."
            value={rejectionMessage}
            onChange={(e) => setRejectionMessage(e.target.value)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ServiceDetailsPage;

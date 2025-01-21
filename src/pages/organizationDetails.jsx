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
  Row,
  Col,
  Table,
  Space,
  Button,
  Modal,
  Input,
  message,
} from "antd";
import { ArrowLeftOutlined, EyeOutlined } from "@ant-design/icons";
import {
  useOrgDetails,
  useUpdateOrgStatus,
  useBlockOrganization,
  useServiceListing,
} from "../hooks/useOrgData";

const { Title, Text } = Typography;

const OrganizationDetailsPage = () => {
  const { id: organizationId } = useParams();
  const navigate = useNavigate();

  const {
    data: organizationDetails,
    isLoading,
    isError,
  } = useOrgDetails(organizationId);

  const { data: serviceData } = useServiceListing({}, organizationId);

  const { mutate: updateStatus } = useUpdateOrgStatus();
  const { mutate: toggleOrganizationStatus } = useBlockOrganization();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleStatusChange = (action) => {
    if (action === "reject") {
      setShowRejectModal(true);
    } else {
      updateStatus({ organizationId, status: "approved", action: "approve" });
    }
  };

  const handleReject = () => {
    updateStatus({
      organizationId,
      action: "reject",
      message: rejectionMessage,
    });
    setShowRejectModal(false);
    setRejectionMessage("");
  };

  const handleBlockToggle = () => {
    toggleOrganizationStatus({
      organizationId,
      isBlocked: !organizationData.isBlocked,
    });
    message.success(
      `Organization ${
        organizationData.isBlocked ? "unblocked" : "blocked"
      } successfully`
    );
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalVisible(true);
  };

  const handleImageModalClose = () => {
    setIsImageModalVisible(false);
    setSelectedImage(null);
  };

  if (isLoading) return <Skeleton active />;
  if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load organization details"
        type="error"
        showIcon
      />
    );
  }

  const organizationData = organizationDetails?.data || {};
  const {
    nameOrg,
    intro,
    address,
    contactPerson,
    contactNumber,
    panNo,
    rating,
    ratedBy,
    message,
    totalRating,
    isActive,
    isBlocked,
    status,
    createdAt,
    orgImg = [],
    citzImg = [],
    panImg = [],
  } = organizationData;

  const columns = [
    {
      title: "Service Name",
      dataIndex: ["service", "name"],
      key: "serviceName",
    },
    {
      title: "Service Code",
      dataIndex: ["service", "serviceCode"],
      key: "serviceCode",
    },
    {
      title: "Provider",
      dataIndex: "serviceProviderName",
      key: "serviceProviderName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `Rs.${price || "N/A"}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => `${rating || 0} / 5`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => navigate(`/service/${record._id}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="organization-details-page">
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
            {nameOrg || "No Organization Name"}
          </Title>
          <Button
            type="primary"
            danger={isBlocked}
            style={{
              margin: "10px",
              fontSize: "20px",
              width: "150px",
              height: "50px",
              backgroundColor: isBlocked ? "green" : "red",
              borderColor: isBlocked ? "green" : "red",
            }}
            onClick={handleBlockToggle}
          >
            {isBlocked ? "Unblock" : "Block"}
          </Button>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title={<Title level={4}>Organization Information</Title>}
              className="shadow-md"
            >
              <div>
                <Text strong>Introduction:</Text>{" "}
                {intro || "No introduction available."}
              </div>
              <Divider />
              <div>
                <Text strong>Address:</Text> {address || "N/A"}
              </div>
              <div>
                <Text strong>Contact Person:</Text> {contactPerson || "N/A"}
              </div>
              <div>
                <Text strong>Contact Phone:</Text> {contactNumber || "N/A"}
              </div>

              <div>
                <Text strong>Message:</Text> {message || "N/A"}
              </div>

              <div>
                <Text strong>PAN Number:</Text> {panNo || "N/A"}
              </div>
              <div>
                <Text strong>Status:</Text> {status || "N/A"}
              </div>
              <div>
                <Text strong>Blocked:</Text> {isBlocked ? "Yes" : "No"}
              </div>
              <div>
                <Text strong>Active:</Text> {isActive ? "Yes" : "No"}
              </div>

              <div>
                <Text strong>Rating:</Text> {rating} / 5 (by {ratedBy} users)
              </div>
              <div>
                <Text strong>Total Rating:</Text> {totalRating}
              </div>
              <div>
                <Text strong>Created At:</Text>{" "}
                {new Date(createdAt).toLocaleDateString() || "N/A"}
              </div>
              <Divider />
              <Row justify="end">
                {status !== "approved" && (
                  <Button
                    type="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => handleStatusChange("approve")}
                  >
                    Approve
                  </Button>
                )}
                {status !== "rejected" && (
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleStatusChange("reject")}
                  >
                    Reject
                  </Button>
                )}
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title={<Title level={4}>Images</Title>} className="shadow-md">
              {/* Citizenship Image in its own row */}
              <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
                <Col span={24}>
                  <Title level={5}>Citizenship Image</Title>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "16px",
                    }}
                  >
                    {citzImg.map((image, index) => (
                      <Avatar
                        key={index}
                        src={image}
                        shape="square"
                        size={120}
                        alt={`Citizenship Image ${index + 1}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </div>
                </Col>
              </Row>

              {/* Organization Image and PAN Image in another row */}
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Title level={5}>Organization Image</Title>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "16px",
                    }}
                  >
                    {orgImg.map((image, index) => (
                      <Avatar
                        key={index}
                        src={image}
                        shape="square"
                        size={120}
                        alt={`Organization Image ${index + 1}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </div>
                </Col>

                <Col span={12}>
                  <Title level={5}>PAN Image</Title>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "16px",
                    }}
                  >
                    {panImg.map((image, index) => (
                      <Avatar
                        key={index}
                        src={image}
                        shape="square"
                        size={120}
                        alt={`PAN Image ${index + 1}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
          <Col xs={24}>
            <Card
              title={<Title level={4}>Services Offered</Title>}
              className="shadow-md mb-4"
            >
              <Table
                columns={columns}
                dataSource={serviceData?.data?.docs || []}
                rowKey={(record) => record._id}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>

        <Modal
          title="Reject Organization"
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

        <Modal
          title="Image Preview"
          visible={isImageModalVisible}
          footer={null}
          onCancel={handleImageModalClose}
        >
          <img
            alt="Organization"
            style={{ width: "100%" }}
            src={selectedImage}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default OrganizationDetailsPage;

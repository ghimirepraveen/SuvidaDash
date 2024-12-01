import React from "react";
import { Table, Tag, Spin, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ServiceTable = ({ data, isLoading, isError }) => {
  const navigate = useNavigate();

  if (isLoading) return <Spin tip="Loading..." />;
  if (isError) return <div>Error loading data.</div>;

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "organizationName",
      key: "organizationName",
    },
    { title: "Service Name", dataIndex: "serviceName", key: "serviceName" },
    { title: "Service Code", dataIndex: "serviceCode", key: "serviceCode" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Service Provider",
      dataIndex: "serviceProviderName",
      key: "serviceProviderName",
    },
    {
      title: "Provider Email",
      dataIndex: "serviceProviderEmail",
      key: "serviceProviderEmail",
    },
    {
      title: "Provider Phone",
      dataIndex: "serviceProviderPhone",
      key: "serviceProviderPhone",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Tag color="blue">{rating}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => handleView(record)}
            icon={<EyeOutlined />}
          />
          <Button
            type="link"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          />
        </>
      ),
    },
  ];

  const handleView = (record) => {
    navigate("/service/" + record.key);
  };

  const handleEdit = (record) => {
    navigate("/service/edit/" + record.key);
  };

  const mappedDataSource = data?.data?.docs.map((doc) => ({
    key: doc._id,
    organizationName: doc.nameorg,
    organizationId: doc._id,
    serviceName: doc.service?.name || "N/A",
    serviceCode: doc.service?.servicecode || "N/A",
    status: doc.status,
    serviceProviderName: doc.serviceprovidername,
    serviceProviderEmail: doc.serviceprovideremail,
    serviceProviderPhone: doc.serviceproviderphone,
    price: doc.price,
    isActive: doc.isActive,
    rating: doc.rating,
  }));

  return <Table columns={columns} dataSource={mappedDataSource} />;
};

export default ServiceTable;

import React from "react";
import { Table, Spin, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ data, isLoading, isError, onPageChange, pagination }) => {
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
      render: (price) => `Rs.${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleView(record)}
          icon={<EyeOutlined />}
        />
      ),
    },
  ];

  const handleView = (record) => {
    navigate(`/order/${record.key}`);
  };

  const mappedDataSource = data?.data?.docs.map((doc) => ({
    key: doc._id,
    organizationName: doc.org?.nameOrg || "N/A",
    serviceName: doc.servicenames?.name || "N/A",
    serviceCode: doc.servicenames?.servicecode || "N/A",
    status: doc.status || "N/A",
    serviceProviderName: doc.service?.serviceprovidername || "N/A",
    serviceProviderEmail: doc.service?.serviceprovideremail || "N/A",
    serviceProviderPhone: doc.service?.serviceproviderphone || "N/A",
    price: doc.price || 0,
  }));

  return (
    <Table
      columns={columns}
      dataSource={mappedDataSource}
      pagination={{
        ...pagination,
        onChange: onPageChange,
      }}
    />
  );
};

export default OrderTable;

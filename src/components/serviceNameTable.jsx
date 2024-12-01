import React from "react";
import { Table, Button, Switch, Spin, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ServiceNameTable = ({ data, isLoading, isError, onPageChange }) => {
  const navigate = useNavigate();

  if (isLoading) return <Spin tip="Loading..." />;
  if (isError) return <div>Error loading data.</div>;
  if (!data?.data?.docs?.length) return <div>No services available.</div>;

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Service Code",
      dataIndex: "servicecode",
      key: "servicecode",
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
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
          <Switch
            checked={record.isActive}
            onChange={(checked) => handleToggleStatus(record.key, checked)}
          />
        </>
      ),
    },
  ];

  const handleView = (record) => {
    navigate("/service-name/" + record.key);
  };

  const handleToggleStatus = (id, isActive) => {
    // Replace with your API call to update status
    console.log(`Toggling status for ${id} to ${isActive}`);
    message.success(
      `Service status updated to ${isActive ? "Active" : "Inactive"}`
    );
  };

  const mappedDataSource = data?.data?.docs.map((doc, index) => ({
    key: doc._id || index,
    name: doc.name,
    servicecode: doc.servicecode,
    isActive: doc.isActive,
  }));

  return (
    <Table
      columns={columns}
      dataSource={mappedDataSource}
      pagination={{
        current: data?.data?.page,
        pageSize: data?.data?.limit,
        total: data?.data?.totalDocs,
        onChange: (page, pageSize) => {
          onPageChange(page, pageSize);
        },
      }}
    />
  );
};

export default ServiceNameTable;

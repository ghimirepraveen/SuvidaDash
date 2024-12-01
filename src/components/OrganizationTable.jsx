// src/components/OrganizationTable.js
import React from "react";
import { Table, Tag, Spin, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OrganizationTable = ({ data, isLoading, isError }) => {
  const navigate = useNavigate();
  if (isLoading) return <Spin tip="Loading..." />;
  if (isError) return <div>Error loading data.</div>;

  const columns = [
    { title: "Organization Name", dataIndex: "nameorg", key: "nameorg" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Contact Person",
      dataIndex: "contactperson",
      key: "contactperson",
    },
    {
      title: "Contact Phone",
      dataIndex: "contactphno",
      key: "contactphno",
    },
    {
      title: "Blocked Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked) => (isBlocked ? "Blocked" : "Active"),
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
    navigate("/organization/" + record.key);
  };

  const handleEdit = (record) => {
    console.log(record);
    navigate("/organization/edit/" + record.key);
  };

  const mappedDataSource = data?.data?.docs?.map((org) => ({
    key: org._id,
    nameorg: org.nameorg,
    status: org.status,
    contactperson: org.contactperson,
    contactphno: org.contactphno,
    isBlocked: org.isBlocked,
    rating: org.rating,
  }));

  return (
    <Table
      style={{ fontSize: "25px" }}
      columns={columns}
      dataSource={mappedDataSource}
    />
  );
};

export default OrganizationTable;

import React from "react";
import { Table, Tag, Spin, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const OrganizationTable = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return <Spin tip="Loading..." />;
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
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      render: (rating) => (
        <Tag color={rating > 0 ? "blue" : "red"}>{rating || "Unrated"}</Tag>
      ),
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
    navigate(`/organization/${record.key}`);
  };

  const handleEdit = (record) => {
    navigate(`/organization/edit/${record.key}`);
  };

  const mappedDataSource = data?.data?.docs?.map((org) => ({
    key: org._id,
    nameorg: org.nameOrg,
    status: org.status,
    contactperson: org.contactPerson,
    contactNumber: org.contactNumber,
    address: org.address || `${org.coordinates[1]}, ${org.coordinates[0]}`,
    isBlocked: org.isBlocked,
    isActive: org.isActive,
    rating: org.rating,
  }));

  return <Table columns={columns} dataSource={mappedDataSource} />;
};

export default OrganizationTable;

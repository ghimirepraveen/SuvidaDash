import React, { useState } from "react";
import {
  Table,
  Button,
  Switch,
  message,
  Modal,
  Form,
  Input,
  Descriptions,
  Spin,
} from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateServiceName,
  getServiceNameDetails,
} from "../api/FetchServiceNameData";

const ServiceNameTable = ({ data, onPageChange, page, limit }) => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedService, setSelectedService] = useState(null);
  const [viewService, setViewService] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const mutation = useMutation({
    mutationFn: updateServiceName,
    onSuccess: () => {
      message.success("Service updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["serviceData"] });
      setIsModalVisible(false);
      setIsUpdating(false);
    },
    onError: () => {
      message.error("Failed to update service.");
      setIsUpdating(false);
    },
  });

  const showEditModal = (record) => {
    setSelectedService(record);
    form.setFieldsValue({
      name: record.name,
      isActive: record.isActive,
    });
    setIsModalVisible(true);
  };

  const showViewModal = async (id) => {
    try {
      const serviceDetails = await getServiceNameDetails(id);
      setViewService(serviceDetails.data);
      setIsViewModalVisible(true);
    } catch (error) {
      message.error("Failed to fetch service details.");
    }
  };

  const handleEditSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setIsUpdating(true);
        mutation.mutate({ id: selectedService._id, updatedData: values });
      })
      .catch((error) => {
        console.error("Validation Failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsViewModalVisible(false);
    form.resetFields();
  };

  if (!data || !data.docs || !data.pagination) {
    return <p>No data available</p>;
  }

  const columns = [
    { title: "Service Name", dataIndex: "name", key: "name" },
    { title: "Service Code", dataIndex: "servicecode", key: "servicecode" },
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
            icon={<EyeOutlined />}
            onClick={() => showViewModal(record._id)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="primary"
          />
        </>
      ),
    },
  ];

  const { total, page: currentPage, limit: pageSize } = data.pagination;

  return (
    <>
      <Table
        columns={columns}
        dataSource={data.docs}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: onPageChange,
        }}
      />

      <Modal
        title="Edit Service Name"
        visible={isModalVisible}
        onOk={handleEditSubmit}
        onCancel={handleCancel}
        confirmLoading={isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Service Name"
            rules={[
              { required: true, message: "Please input the service name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Service Details"
        visible={isViewModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        {viewService ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Service Name">
              {viewService.name}
            </Descriptions.Item>
            <Descriptions.Item label="Service Code">
              {viewService.servicecode}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {viewService.isActive ? "Active" : "Inactive"}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(viewService.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {new Date(viewService.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Spin tip="Loading details..." />
        )}
      </Modal>
    </>
  );
};

export default ServiceNameTable;

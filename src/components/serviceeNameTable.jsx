import React, { useState } from "react";
import {
  Table,
  Button,
  Switch,
  Spin,
  message,
  Modal,
  Form,
  Input,
  Descriptions,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  updateServiceName,
  getServiceNameDetails,
  addServiceName,
} from "../api/FetchServiceNameData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ServiceNameTable = ({ data, isLoading, isError, onPageChange }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [viewService, setViewService] = useState(null);
  const [form] = Form.useForm();
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchText, setSearchText] = useState("");

  const mutation = useMutation({
    mutationFn: addServiceName,
    onSuccess: () => {
      message.success("Service name added successfully!");
      queryClient.invalidateQueries({ queryKey: ["serviceData"] });
      setIsModalVisible(false);
      form.resetFields();
    },
    onError: () => {
      message.error("Failed to add service name.");
    },
  });

  if (isLoading) return <Spin tip="Loading..." />;
  if (isError) return <div>Error loading data.</div>;
  if (!data?.data?.docs?.length) return <div>No services available.</div>;

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

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsUpdating(true);
      await updateServiceName(selectedService.key, values);
      message.success("Service updated successfully!");
      setIsModalVisible(false);
      setIsUpdating(false);
    } catch (error) {
      message.error("Failed to update service.");
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsViewModalVisible(false);
    form.resetFields();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data?.data?.docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchText)
  );

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
            icon={<EyeOutlined />}
            onClick={() => showViewModal(record.key)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="primary"
          ></Button>
        </>
      ),
    },
  ];

  const mappedDataSource = filteredData.map((doc, index) => ({
    key: doc._id || index,
    name: doc.name,
    servicecode: doc.servicecode,
    isActive: doc.isActive,
  }));

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Service Name
        </Button>
        <Input
          placeholder="Search Service Name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>

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

      <Modal
        title="Edit Service Name"
        visible={isModalVisible}
        onOk={handleEditSubmit}
        onCancel={handleCancel}
        confirmLoading={isUpdating}
        className="rounded-lg shadow-xl p-4"
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
        className="rounded-lg shadow-xl p-6"
      >
        {viewService ? (
          <div className="space-y-4">
            <Descriptions bordered column={1} className="space-y-4">
              <Descriptions.Item label="Service Name">
                <span className="text-lg font-semibold">
                  {viewService.name}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Service Code">
                <span className="text-sm text-gray-500">
                  {viewService.servicecode}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <span
                  className={`${
                    viewService.isActive ? "text-green-500" : "text-red-500"
                  } font-medium`}
                >
                  {viewService.isActive ? "Active" : "Inactive"}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                <span className="text-sm">
                  {new Date(viewService.createdAt).toLocaleString()}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                <span className="text-sm">
                  {new Date(viewService.updatedAt).toLocaleString()}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <Spin tip="Loading details..." />
        )}
      </Modal>
    </>
  );
};

export default ServiceNameTable;

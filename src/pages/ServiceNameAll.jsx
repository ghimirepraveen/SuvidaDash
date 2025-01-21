import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ServiceNameTable from "../components/serviceeNameTable";
import { Input, message, Spin, Alert, Button, Modal, Form, Switch } from "antd";
import useServiceNameData from "../hooks/useServiceName";
import { addServiceName } from "../api/FetchServiceNameData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ServiceNameAll = () => {
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(undefined);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  // Fetch service name data with search, pagination, and filter
  const { data, isLoading, isError, error } = useServiceNameData({
    search,
    isActive,
    page,
    limit,
  });

  // Mutation for adding a new service name
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

  // Handle page and limit changes
  const handlePageChange = (newPage, newLimit) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  // Modal form submission
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        mutation.mutate({
          name: values.name,
          isActive: values.isActive,
        });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  // Handle active state filter
  const toggleActiveFilter = (checked) => {
    setIsActive(checked ? true : undefined); // Set `true` for active, or clear filter
    setPage(1); // Reset to first page when filter changes
  };

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description={error.message || "Failed to fetch service names."}
        type="error"
        showIcon
      />
    );
  }

  return (
    <DashboardLayout>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search Service Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300, marginRight: 16 }}
        />
        <Switch
          checked={isActive === true}
          onChange={toggleActiveFilter}
          style={{ marginRight: 16 }}
          checkedChildren="Active"
          unCheckedChildren="All"
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Service Name
        </Button>
      </div>

      <ServiceNameTable
        data={data.data}
        onPageChange={handlePageChange}
        page={page}
        limit={limit}
      />

      <Modal
        title="Add Service Name"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={mutation.isLoading}
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
          <Form.Item
            name="isActive"
            label="Is Active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default ServiceNameAll;

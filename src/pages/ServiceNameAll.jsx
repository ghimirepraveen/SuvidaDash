import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ServiceNameTable from "../components/ServiceNameTable";
import { Input, message, Spin, Alert, Button, Modal, Form, Switch } from "antd";
import useServiceNameData from "../hooks/useServiceName";
import { addServiceName } from "../api/FetchServiceNameData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ServiceNameAll = () => {
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useServiceNameData({
    search,
    isActive,
  });

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
        console.log("Validate Failed:", info);
      });
  };

  if (isLoading) return <Spin tip="Loading..." />;
  if (isError)
    return <Alert message="Error" description={error.message} type="error" />;

  return (
    <DashboardLayout>
      {/* <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Service Name
      </Button> */}

      <ServiceNameTable data={data || []} />

      <Modal
        title="Add Service Name"
        visible={isModalVisible}
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

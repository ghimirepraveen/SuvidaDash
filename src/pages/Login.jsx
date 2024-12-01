import React from "react";
import { Card, Form, Input, Button, Checkbox, Typography, Space } from "antd";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const onFinish = (values) => {
    login.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: () => {
          navigate("/organization/requested");
        },
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card style={{ width: 500, padding: "20px 20px" }} bordered={false}>
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", textAlign: "center" }}
        >
          <Title level={3}>Login</Title>
          <Text type="secondary">
            Please enter your email and password to continue.
          </Text>
        </Space>
        <Form
          name="login"
          layout="vertical"
          initialValues={{
            remember: true,
            email: "admin@gmail.com",
            password: "dev@getnada.com",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={login.isLoading}
              block
              style={{ height: "40px", fontSize: "16px" }}
            >
              Login
            </Button>
          </Form.Item>
          {login.isError && (
            <Text
              type="danger"
              style={{ textAlign: "center", display: "block" }}
            >
              Error logging in: {login.error.response.data.message}
            </Text>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default Login;

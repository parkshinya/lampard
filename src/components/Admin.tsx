import React from "react";
import { Button, Form, Input } from "antd";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const onFinish = async (newUser: FieldType) => {
  await createUserWithEmailAndPassword(
    auth,
    newUser.email,
    newUser.password
  ).catch((err) => alert(err.message));
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email: string;
  password: string;
};

const Admin: React.FC = () => (
  <div style={{ height: "100vh", width: "100%", position: "relative" }}>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{
        maxWidth: 600,
        position: "absolute",
        top: "40%",
        left: "40%",
        textAlign: "right",
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default Admin;

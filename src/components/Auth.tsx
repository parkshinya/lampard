import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

type FieldType = {
  email: string;
  password: string;
};

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (loginUser: FieldType) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
      .catch((err) => alert(err.message))
      .then(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;

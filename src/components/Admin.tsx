import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { collection, addDoc } from "firebase/firestore";

type FieldType = {
  username: string;
  company: string;
  email: string;
  password: string;
};

const Admin: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (newUser: FieldType) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async (userCredential) => {
        await addDoc(collection(db, "users"), {
          uid: userCredential.user.uid,
          company: newUser.company,
          username: newUser.username,
        });
      })
      .then(() => setLoading(false))
      .catch((err) => alert(err.message));
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
          label="username"
          name="username"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item<FieldType>
          label="company"
          name="company"
          rules={[{ required: true, message: "Please input your company" }]}
        >
          <Input type="text" />
        </Form.Item>
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;

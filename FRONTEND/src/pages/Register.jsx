import { useState } from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, Radio, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const onFinishHandler = async (values) => {
    try {
      values.role = role;
      const res = await axios.post(`${API_BASE_URL}/user/register`, values);
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error("Email or username already exists");
      } else {
        message.error("Something Went Wrong");
      }
    }
  };

  return (
    <>
      <div className="background-image"></div>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register Form</h3>

          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input type="password" />
          </Form.Item>

          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please select your role!' }]}>
            <Radio.Group onChange={(e) => setRole(e.target.value)} value={role}>
              <Radio value="user">User</Radio>
              <Radio value="admin">Admin</Radio>
              <Radio value="doctor">Doctor</Radio>
            </Radio.Group>
          </Form.Item>
          <Link to="/" className="m-2">
            Already a user?
          </Link>

          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;

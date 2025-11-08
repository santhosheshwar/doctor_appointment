import { useState } from "react";
import { Form, Input, Radio, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginStyles.css";
import PropTypes from 'prop-types';
import API_BASE_URL from '../config/api';

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);

  const onFinishHandler = async (values) => {
    try {
      const loginData = { ...values, role };
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/user/login`, loginData);
      const usersResponse = await axios.post(`${API_BASE_URL}/user/getuser`, {
            email: values.email
        });
      message.success("Login Successful");
      localStorage.setItem("token", response.data.token);
      const name = (usersResponse.data).find((x) => x.email === values.email);
      localStorage.setItem("user", JSON.stringify(name));
      setIsAuthenticated(true)
      setTimeout(() => {
        setLoading(false);
        if (role === "user") {
          navigate("/homepage");
        } else if (role === "admin") {
          navigate("/adminhomepage");
        } else if (role === "doctor") {
          navigate("/doctorpage");
        }
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      message.error("Login unsuccessful");
    }
  };

  return (
      <>
        <div className="login-container">
          <div className="background-image"></div>
          <div className="form-container">
            {loading ? (
                <div className="spin-container">
                  <Spin size="large" />
                </div>
            ) : (
                <Form layout="" onFinish={onFinishHandler} className="register-form">
                  <h1 className="text-center">Login Form</h1>

                  <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: "Please enter your email" }]}
                  >
                    <Input
                        type="email"
                        onChange={(value) => {
                          setEmail(value.target.value);
                        }}
                        value = {email}
                    />
                  </Form.Item>

                  <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: "Please enter your password" }]}
                  >
                    <Input
                        type="password"
                        onChange={(value) => {
                          setPassword(value.target.value);
                        }}
                        value = {password}
                    />
                  </Form.Item>

                  <Form.Item label="Role" name="role">
                    <Radio.Group
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                        required
                    >
                      <Radio value="user">User</Radio>
                      <Radio value="admin">Admin</Radio>
                      <Radio value="doctor">Doctor</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Link to="/register" className="m-2">
                      Not a user? Register here
                    </Link>
                  </Form.Item>

                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </Form>
            )}
          </div>
        </div>
      </>
  );
};
Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;

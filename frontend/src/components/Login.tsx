import {
    LockOutlined,
    UserOutlined,
    GoogleOutlined,
    AppleFilled,
} from "@ant-design/icons";
import { Button, Form, Input, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";

import { useInput } from "../hooks/useInput";

import { openModal } from "../store/modal-slice";
import { useModalDispatch } from "../store/hooks";

import { validateEmail, validatePassword } from "../util/validation";
import axios from "axios";

const Login = () => {
    const modalDispatch = useModalDispatch();
    const navigate = useNavigate();
    const {
        value: emailValue,
        handleInputBlur: handleEmailBlur,
        handleInputChange: handleEmailChange,
        isValid: isEmailValid,
        isTouched: isEmailTouched,
    } = useInput("", validateEmail);

    const {
        value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleInputChange: handlePasswordChange,
        isValid: isPasswordValid,
        isTouched: isPasswordTouched,
    } = useInput("", validatePassword);

    const handleFinish = async () => {
        if (isEmailValid && isPasswordValid) {
            const res = await axios.post("/api/v1/auth/login", {
                email: emailValue,
                password: passwordValue,
            });
            if (res.status === 200) {
                message.success("Login Successful!");
            } else {
                message.error("Please fix the errors in the form.");
            }
        } else {
            message.error("Please fix the errors in the form.");
        }
    };

    const loginWithGoogle = async () => {
        window.open("/api/v1/auth/google");
        window.addEventListener("message", (event) => {
            if (event.data.isAuthenticated) {
                message.success(event.data.message);
                navigate("/");
            } else {
                message.error(event.data.message);
            }
        });
    };

    return (
        <Form
            id="login-form"
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleFinish}
        >
            <Form.Item
                name="email"
                id="email-input"
                validateStatus={
                    !isEmailTouched ? "" : isEmailValid ? "success" : "error"
                }
                help={
                    !isEmailTouched
                        ? ""
                        : isEmailValid
                          ? ""
                          : "Please input a valid Email!"
                }
            >
                <Input
                    autoComplete="off"
                    id="email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="email"
                    placeholder="Email"
                    value={emailValue}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                />
            </Form.Item>
            <Form.Item
                name="password"
                id="password-input"
                validateStatus={
                    !isPasswordTouched
                        ? ""
                        : isPasswordValid
                          ? "success"
                          : "error"
                }
                help={
                    !isPasswordTouched
                        ? ""
                        : isPasswordValid
                          ? ""
                          : "Password must be at least 8 characters!"
                }
            >
                <Input.Password
                    id="password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    value={passwordValue}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                />
            </Form.Item>
            <Form.Item id="forgot-password">
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>
            <Form.Item id="buttons">
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    id="login-button"
                >
                    Log in
                </Button>{" "}
                Or
                <Button
                    type="link"
                    onClick={() => modalDispatch(openModal("signup"))}
                    id="signup-button"
                >
                    Signup
                </Button>
            </Form.Item>
            <Divider>Or</Divider>
            <div className="flex justify-center space-x-4">
                <button onClick={loginWithGoogle}>
                    <GoogleOutlined className="text-xl text-blue-500 hover:text-blue-700 cursor-pointer" />
                </button>
                <AppleFilled className="text-xl text-black hover:text-gray-700 cursor-pointer" />
            </div>
        </Form>
    );
};

export default Login;

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

import { useInput } from "../hooks/useInput";

import { openModal } from "../store/modal-slice";
import { useModalDispatch } from "../store/hooks";

import {
  validateEmail,
  validatePassword,
  validateName,
} from "../util/validation";

const Signup = () => {
  const modalDispatch = useModalDispatch();

  const {
    value: FnameValue,
    handleInputBlur: handleFnameBlur,
    handleInputChange: handleFnameChange,
    isValid: isFnameValid,
    isTouched: isFnameTouched,
  } = useInput("", validateName);

  const {
    value: LnameValue,
    handleInputBlur: handleLnameBlur,
    handleInputChange: handleLnameChange,
    isValid: isLnameValid,
    isTouched: isLnameTouched,
  } = useInput("", validateName);

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

  const handleFinish = () => {
    if (isEmailValid && isPasswordValid && isFnameValid && isLnameValid) {
      message.success("Login Successful!");

      console.log(FnameValue);
      console.log(LnameValue);
      console.log(emailValue);
      console.log(passwordValue);
    } else {
      message.error("Please fix the errors in the form.");
    }
  };

  return (
    <Form
      id="signup-form"
      name="signup"
      className="signup-form"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
    >
      <Form.Item
        name="fname"
        id="fname-input"
        validateStatus={
          !isFnameTouched ? "" : isFnameValid ? "success" : "error"
        }
        help={
          !isFnameTouched
            ? ""
            : isFnameValid
            ? ""
            : "Please input a valid First name!"
        }
      >
        <Input
          id="fname"
          placeholder="First Name"
          value={FnameValue}
          onChange={handleFnameChange}
          onBlur={handleFnameBlur}
        />
      </Form.Item>
      <Form.Item
        name="lname"
        id="lname-input"
        validateStatus={
          !isLnameTouched ? "" : isLnameValid ? "success" : "error"
        }
        help={
          !isLnameTouched
            ? ""
            : isLnameValid
            ? ""
            : "Please input a valid Last name!"
        }
      >
        <Input
          id="lname"
          placeholder="Last Name"
          value={LnameValue}
          onChange={handleLnameChange}
          onBlur={handleLnameBlur}
        />
      </Form.Item>
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
          !isPasswordTouched ? "" : isPasswordValid ? "success" : "error"
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
        <a className="signup-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item id="buttons">
        <Button
          type="primary"
          htmlType="submit"
          className="signup-form-button"
          id="signup-button"
        >
          Signup
        </Button>{" "}
        Or
        <Button
          type="link"
          onClick={() => modalDispatch(openModal("login"))}
          id="login-button"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;
